---
id: api-reference
title: API Reference
sidebar_label: API Reference
---

## Main API

### `getService<T>(token: Type<T>): T`

Instantiate a service by providing mocks for all of its dependencies.

A mock is automatically created for all dependencies of the service which are not mocked yet.

Example:

```ts
describe('MyService', () => {
    let myService: MyService;

    beforeEach(() => {
        myService = getService(MyService);
    });
});
```

### `getMock<T>(token: Type<T> | InjectionToken<T>): Mock<T>`

Returns the mock associated with this injection token. If no such mock exists yet, it is created.

This function can be called before or after `getService`. Either way, only one mock is created for each injection token.

Calling `getMock` multiple times in a single test with the same injection token always returns the same object instance.

Example:

```ts
const dependencyService = getMock(MyServiceDependency);
when(dependencyService.greet('John')).return('Hello John').once();
```

### `renderComponent<T, TBindings>(component: Type<T>, module: Type<any> | ModuleWithProviders, options: RenderSettings<TBindings>): Promise<Rendering<T, never>>`

Shallow-renders a component, meaning that its children components are not rendered themselves, and any constructor dependency is mocked.

TODO example

## Advanced API

### `createMock<T>(token: Type<T> | InjectionToken<T>, backing?: Partial<T>): Mock<T>`

Manually create a mock with an optional backing object.

This function must be called before `getService`, `getShallow` or `renderComponent`.

Any subsequent call to `getMock` with the same injection token will return the same mock that was created with `createMock`.

TODO: example


### `getShallow<T>(component: Type<T>, module: Type<any> | ModuleWithProviders): Shallow<T>`

Configures and return a [Shallow renderer](https://getsaf.github.io/shallow-render/#shallow-class).

Use this method if you would like to further customize the renderer. In most cases, `renderComponent` should be used instead.

TODO example

### `configureTestBed(service: Type<T>): void`

Configures the angular TestBed with mocks for all of the dependencies of the service.

Only use this if you would like to customize the dependencies before creating a service. In general, you should use `getService` instead. 

Example:
```ts
configureTestBed(MyService);
TestBed.overrideProvider(MyDependency, { useValue: fakeDependency });
const service = TestBed.inject(MyService);
```

## Utilities

### `class BasePage<T>`

Base class for page objects. See [base-class.ts](https://github.com/hmil/ng-vacuum/blob/master/src/utils/base-page.ts) for detailed documentation.

Example:
```ts
class Page extends BasePage<MyComponent> {
    get loginButton(): HTMLElement {
        return this.rendering.find('[test-id=login-button]').nativeElement;
    }

    get fancyButton() {
        return this.rendering.findComponent(FancyButtonComponent);
    }
}
```

## `catchUnhandledErrors(): void`

Catches all unhandled errors during test execution and fails the test if any error occurs.

The default angular config allows many errors to escape the test suite which can lead to silent errors.
Call this utility in the `test.ts` file to catch these errors before they can escape.
 
Example:
```ts
// src/test.ts

import { catchUnandledErrors } from 'ng-vacuum';

catchUnhandledErrors();
```
