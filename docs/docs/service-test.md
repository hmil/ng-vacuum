---
id: service-test
title: Test a Service
sidebar_label: Test a Service
---

In this section, you will learn the basics of writing a service test with NgVacuum. We provide sample code so you can follow along.

**tl;dr**: jump directly to the [recap](#recap) for the full code example.

## Sample project

Copy the code below if you would like to follow the examples in this section.

_access-control.service.ts_
```ts
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AccessControlService {

    constructor(
            private readonly authService: AuthService,
            private readonly router: Router) {
    }

    public checkAccess(zone: 'lobby' | 'dashboard'): boolean {
        if (zone === 'lobby' && this.authService.isAuthenticated()) {
            this.router.navigate(['logout']);
            return false;
        } else if (zone === 'dashboard' && !this.authService.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
```

_auth.service.ts_
```ts
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private authenticated = false;

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public setAuthenticated(value: boolean): void {
        this.authenticated = value;
    }
}
```

## Instantiate the service

The first thing you'll need when testing a service is... the service itself!

Here, we would like to test `AccessControlService`. We instantiate it with `getService`.

_access-control.service.spec.ts_
```ts
import { AccessControlService } from './access-control.service';
import { getService } from 'ng-vacuum';

describe('AccessControlService', () => {
    let service: AccessControlService;

    beforeEach(() => {
        service = getService(AccessControlService);
    });
});
```

The next thing you'll need is... nothing!

This is the only boilerplate needed to bootstrap a service test with NgVacuum.

All the dependencies of `AccessControlService` are automatically mocked and injected. You don't need to deal with this yourself.

## Write a test case

We would like to test that `checkAccess` redirects to the logout page when trying to access the lobby while unauthenticated. This corresponds to the first branch of the method, specifically:

```ts
if (zone === 'lobby' && this.authService.isAuthenticated()) {
    this.router.navigate(['logout']);
    return false;
}
```

We start off by calling the method with the appropriate parameter and asserting the expected result.

```ts
describe('AccessControlService', () => {

    // snip

    it('redirects to logout when trying to access the lobby while authenticated', () => {
        const result = service.checkAccess('lobby');
        expect(result).toBe(false);
    });
})
```

This is what we get when running this test:

```
Error: Unexpected property access: <AuthService>.isAuthenticated
This mock is not backed
```

This error message tells us that something tried to access a member called `isAuthenticated` on the service `AuthService`, but we did not specify what should happen in this situation.

This error comes from [OmniMock](https://github.com/hmil/omnimock), the type-safe mocking library used by NgVacuum to mock all service dependencies. This library is a safer alternative to standard jasmine mocks, as it was built for TypeScript and it is type safe out of the box.

:::note

In this situation, a typical jasmine mock will not throw an error and instead it will allow the method to be called and return `undefined`. This default behavior most likely violates the type contract of the class and can lead to difficult bugs down the line, such as the infamous `undefined is not a function`.

:::

### Specify mock behavior

So how do we specify what happens when `AuthService.isAuthenticated` is called?
We first need to obtain a reference to the mock of `AuthService` with `getMock`. Then we use the mock DSL provided by OmniMock to specify the behavior.

```ts
import { when } from 'omnimock';
import { getMock } from 'ng-vacuum';

// snip

    it('redirects to logout when trying to access the lobby while authenticated', () => {
        const mockOfAuthService = getMock(AuthService);
        when(mockOfAuthService.isAuthenticated()).return(true);
        const result = service.checkAccess('lobby');
        expect(result).toBe(false);
    });
```

### Expect calls

At this point, our test is still not passing. It complains that no behavior was specified for `<Router>.navigate`.

Again, we use the DSL to specify what happens when this method is called.

```ts
    it('redirects to logout when trying to access the lobby while authenticated', () => {
        when(getMock(AuthService).isAuthenticated()).return(true);
        // Router.navigate returns a promise.
        // We use the shorthand `resolve` to return a promise resolved with the value `true`
        when(getMock(Router).navigate(['logout'])).resolve(true);
        const result = service.checkAccess('lobby');
        expect(result).toBe(false);
    });
```

But in this case we don't just want to specify what to do when this method is called. We want to _verify_ that this method was called with the appropriate arguments.

We us the [_quantifier `.once()`_](https://github.com/hmil/omnimock#quantifiers) to specify that we expect this method to be called exactly once.

```ts
    it('redirects to logout when trying to access the lobby while authenticated', () => {
        // Doesn't care if this is used or not
        when(getMock(AuthService).isAuthenticated()).return(true);
        // Throws an error if this is never called, or called more than once
        when(getMock(Router).navigate(['logout'])).resolve(true).once();
        const result = service.checkAccess('lobby');
        expect(result).toBe(false);
    });
```

Inceed, this test fails when we remove the call in `access-control.service.ts`.

_access-control.service.ts (snippet)_
```ts
if (zone === 'lobby' && this.authService.isAuthenticated()) {
    // this.router.navigate(['logout']); Without this, the test fails
    return false;
}
```

:::note

In OmniMock, you need to invoke `verify()` on a mock to verify that the number of calls match the expectation.
NgVacuum takes care of this automatically for you; It calls `verify()` on all mocks in an `afterEach` function, catching any missing call before the test finishes.

:::

## Recap

We wrote a true unit test for a service in complete isolation, with practically no boilerplate. What's more, the whole code is type-safe and won't break unexpectedly during future refactoring of the main code.

The complete test is shown below for reference.

```ts
import { AccessControlService } from './access-control.service';
import { getMock, getService } from 'ng-vacuum';
import { when } from 'omnimock';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AccessControlService', () => {
    let service: AccessControlService;

    beforeEach(() => {
        service = getService(AccessControlService);
    });

    it('redirects to logout when trying to access the lobby while authenticated', () => {
        when(getMock(AuthService).isAuthenticated()).return(true);
        when(getMock(Router).navigate(['logout'])).resolve(true).once();
        const result = service.checkAccess('lobby');
        expect(result).toBe(false);
    });
});
```

TODO: Stuff left over for an "advanced" section
- If we use getters/setters in authService instead of methods
- Test if access-control service subscribes to an observable in authService
