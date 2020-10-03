import {
    Inject,
    InjectionToken,
    ModuleWithProviders,
    OnDestroy,
    Optional,
    Self,
    SkipSelf,
    Type,
    ɵReflectionCapabilities as ReflectionCapabilities,
} from '@angular/core';
import { flush, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Mock, mock } from 'omnimock';
import { Shallow } from 'shallow-render';
import { Rendering, RenderOptions } from 'shallow-render/dist/lib/models/rendering';
import { store } from './mocks-store';

/**
 * Manually create a mock with an optional backing object.
 *
 * This function must be called before `getService`, `getShallow`, or `renderComponent`.
 *
 * Any subsequent call to `getMock` with the same injection token will return the mock created with `createMock`.
 *
 * @param token The injection token to mock
 * @param backing An optional backing object for the omnimock mock
 */
export function createMock<T>(token: Type<T> | InjectionToken<T>, backing?: Partial<T>): Mock<T> {
    if (store.hasMock(token)) {
        // tslint:disable-next-line: max-line-length
        throw new Error('A mock for this token already exists. Make sure to call createMock at most once and before creating any service or component.');
    }
    return createMockForToken(token, token instanceof InjectionToken ? token.toString() : token, backing);
}

/**
 * Returns the mock for the provided injection token. If no such mock exists yet, one is created.
 *
 * Mocks are automatically created for all injection tokens required to instantiate a service or component
 * with `getService` or `renderComponent`.
 *
 * @param token The injection token whose mock to retreive
 */
export function getMock<T>(token: Type<T> | InjectionToken<T>): Mock<T> {
    const m = store.getMock(token);
    if (m == null) {
        return createMockForToken(token, token instanceof InjectionToken ? token.toString() : token);
    }
    return m as Mock<T>;
}

/**
 * Configures the angular TestBed with mocks for all of the dependencies of the service.
 *
 * Only use this if you would like to customize the dependencies before creating a service. In general, you should use getService instead.
 */
export function configureTestBed(service: Type<unknown>): void {
    const providers: any[] = store.getMockProviders();
    providers.push(service);
    TestBed.configureTestingModule({
        providers
    });
}

/**
 * Instantiate a service by providing mocks for all of its dependencies.
 *
 * A mock is automatically created for all dependencies of the service which are not mocked yet.
 * @param testService the service to test
 */
export function getService<T>(testService: Type<T>): T {
    createMocks(testService);
    configureTestBed(testService);
    return TestBed.get(testService);
}

/**
 * Configures and return a Shallow renderer.
 * 
 * Use this method if you would like to further customize the renderer. In most cases, renderComponent should be used instead.
 *
 * @param testModule 
 */
export function getShallow<T>(testComponent: Type<T>, testModule: Type<any> | ModuleWithProviders): Shallow<T> {

    createMocks(testComponent);

    let shallow = new Shallow(testComponent, testModule)
        .replaceModule(BrowserAnimationsModule, NoopAnimationsModule);

    const providers = store.getMockProviders();
    for (const p of providers) {
        shallow = shallow.provideMock(p);
    }

    return shallow;
}

export interface RenderSettings<TBindings> {
    inputs: TBindings;
}

/**
 * Shallow-renders a component, meaning that its children components are not rendered themselves,
 * and any constructor dependency is mocked.
 *
 * @param testComponent The component to render
 */
export function renderComponent<T, TBindings extends Partial<T>>(
    testComponent: Type<T>,
    testModule: Type<any> | ModuleWithProviders,
    settings?: RenderSettings<TBindings>
): Rendering<T, TBindings> {
    let res: any;
    let options: Partial<RenderOptions<any>> = {};
    if (settings?.inputs != null) {
        options.bind = settings.inputs;
    }
    getShallow(testComponent, testModule).render(options).then(result => res = result);
    flush();
    return res;
}

function getMockName(p: unknown) {
    return typeof p === 'function' && 'name' in p ? p.name : p;
}

function createMockForToken<T>(token: Type<T> | InjectionToken<T>, type: Type<T> | string, backing: Partial<T> = {}): Mock<T> {
    (backing as unknown as OnDestroy)['ngOnDestroy'] = () => undefined;
    const m = typeof type === 'string' ? mock<T>(type as any, backing) : mock(type, backing);
    store.addMock(token, m);
    return m;
}

function createMocks(target: Type<unknown>) {
    const ref = new ReflectionCapabilities();
    const params = ref.parameters(target);

    for (const annotations of params) {
        if (annotations == null) {
            // tslint:disable-next-line: max-line-length
            throw new Error(`Cannot find dependency injection data for service ${getMockName(target)}. Make sure it is annotated with @Injectable().`);
        }
        const meta: any = {};
        for (const annotation of annotations) {
            if (annotation instanceof Optional || annotation === Optional) {
                // skip
            } else if (annotation instanceof SkipSelf || annotation === SkipSelf) {
                // skip
            } else if (annotation instanceof Self || annotation === Self) {
                // skip
            } else if (annotation instanceof Inject) {
                meta.token = annotation.token;
            } else {
                meta.type = annotation;
            }
        }
        const m = mock(meta.type || String(meta.token));
        const p = meta.token || meta.type;
        if (store.hasMock(p)) {
            // This token is already mocked. Skip it.
            continue;
        }
        store.addMock(p, m);
    }
}
