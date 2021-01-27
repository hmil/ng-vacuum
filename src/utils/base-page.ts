import { EventEmitter } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
import { KeysOfType } from 'shallow-render/dist/lib/tools/output-proxy';
export { Rendering } from 'shallow-render/dist/lib/models/rendering';

/**
 * Base class for test page objects.
 * 
 * @remarks
 * Wraps some of the boilerplate required to write clean component tests. 
 * 
 * @public
 */
export class BasePage<TComponent, TBindings = Partial<TComponent>> {

    /**
     * Build the new page object.
     * @param rendering - The rendering object obtained with `renderComponent` or `getShallow().render();`.
     */
    constructor(public readonly rendering: Rendering<TComponent, TBindings>) { }

    /**
     * Detects changes to the component and flushes the fake async queue.
     * This is the most reliable way I found to consistently see the result of property modifications in
     * an angular unit test.
     * Requires the test to run in the `fakeAsync` execution context.
     */
    detectChanges(): void {
        this.rendering.fixture.detectChanges();
        flush();
    }

    /**
     * Sets the values bound to the inputs of the component.
     * 
     * Initial values must be provided for each input in `renderComponent`.
     * 
     * @param values - New values to assign to the component's `@Input` bindings.
     */
    setInputs(values: Partial<TBindings>): void {
        for (const key of Object.keys(values) as Array<keyof TBindings>) {
            if (key in values) {
                this.rendering.bindings[key] = values[key] as any;
            }
        }
        this.detectChanges();
    }

    /**
     * Returns the bound inputs of this component.
     */
    get inputs(): TBindings {
        return this.rendering.bindings;
    }

    /**
     * List of outputs exported by this component.
     */
    get outputs(): { [P in KeysOfType<TComponent, EventEmitter<any>>]: OutputCapture<SubjectType<TComponent[P]>>} {
        let proxy = outputsCache.get(this);
        if (!proxy) {
            proxy = captureOutputs(this.rendering.outputs)
            outputsCache.set(this, proxy);
        }
        return proxy;
    }
}

const outputsCache = new WeakMap<BasePage<any, any>, any>();

/**
 * @public
 */
export interface OutputCapture<T> {
    /**
     * Capture all events emitted by this output starting now.
     * 
     * @returns a mutable array which gets appended each emitted value as it is emitted
     */
    capture(): T[];

    /**
     * Subscribe to this event emitter
     * @remarks
     * See {@link https://angular.io/api/core/EventEmitter#subscribe | EventEmitter.subscribe}
     */
    subscribe(listener: (event: T) => void): void;
}

/**
 * @public
 */
export type SubjectType<T extends Observable<any>> = T extends Observable<infer O> ? O : never;

function captureOutputs(outputs: { [k: string]: EventEmitter<any>}) {
    return new Proxy(
        {},
        {
            get: (_, key: keyof typeof outputs) => {
                const obs = outputs[key] as any;
                return {
                    capture: () => captureObservable(obs),
                    subscribe: (l: (event: any) => void) => obs.subscribe(l)
                };
            },
        }
    ) as any;
}

function captureObservable<T>(obs: Observable<T>): T[] {
    let capture: T[] = [];

    obs.subscribe(value => capture.push(value));
    return capture;
}
