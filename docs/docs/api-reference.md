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

### `getMock<T>(token: InjectionToken<T>): Mock<T>`

Returns the mock associated with this injection token. If no such mock exists yet, it is created.

This function can be called before or after `getService`. Either way, only one mock is created for each injection token.

Calling `getMock` multiple times in a single test with the same injection token always returns the same object instance.

Example:

```ts
const dependencyService = getMock(MyServiceDependency);
when(dependencyService.greet('John')).return('Hello John').once();
```

### `renderComponent<T>(component: Type<T>, module: TODO): TODO`

Shallow-renders a component, meaning that its children components are not rendered themselves, and any constructor dependency is mocked.

TODO example

## Advanced API

### `createMock<T>(token: InjectionToken<T>, backing?: Partial<T>): Mock<T>`

Manually create a mock with an optional backing object.

This function must be called before `getService`, `getShallow` or `renderComponent`.

Any subsequent call to `getMock` with the same injection token will return the same mock that was created with `createMock`.

TODO: example


### `getShallow<T>(component: Type<T>, module: TODO): TODO`

Configures and return a Shallow renderer (TODO link).

Use this method if you would like to further customize the renderer. In most cases, `renderComponent` should be used instead.

TODO example

### `configureTestbed(service: Type<T>)`

Configures the angular TestBed with mocks for all of the dependencies of the service.

Only use this if you would like to customize the dependencies before creating a service. In general, you should use `getService` instead. 

Example:
```ts
configureTestBed(MyService);
TestBed.overrideProvider(MyDependency, { useValue: fakeDependency });
const service = TestBed.inject(MyService);
```