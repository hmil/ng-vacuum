---
id: mocking-techniques
title: Mocking techniques
sidebar_label: Mocking techniques
---

We re-use `AccessControlService` from the getting started guide to illustrate this chapter.

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

## Mocking a getter / setter

This time, `AuthService` has been implemented as a pair of getters and setters.

_auth.service.ts_
```ts
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private authenticated = false;

    public get isAuthenticated(): boolean {
        return this.authenticated;
    }

    public set isAuthenticated(value: boolean): void {
        this.authenticated = value;
    }
}
```

Our test is:

```ts
describe('AccessControlService', () => {
    let service: AccessControlService;

    beforeEach(() => {
        service = getService(AccessControlService);
    });

    it('redirects to logout when trying to access the lobby while authenticated', () => {
        // TODO mock that the current state is authenticated
        const result = service.checkAccess('lobby');
        expect(result).toBe(false);
    });
});
```

Notice that we have not defined the behavior of the getter `AuthService.isAuthenticated` yet. Therefore, it is no surprise that we get an error when this test is run.

```
Error: Unexpected property access: <AuthService>.isAuthenticated
This mock is not backed
```

All we need to do is define that behavior as shown below.

```ts {9}
describe('AccessControlService', () => {
    let service: AccessControlService;

    beforeEach(() => {
        service = getService(AccessControlService);
    });

    it('redirects to logout when trying to access the lobby while authenticated', () => {
        when(getMock(AuthService).isAuthenticated).useValue(true);
        const result = service.checkAccess('lobby');
        expect(result).toBe(false);
    });
});
```

We present an alternative way to achieve the same result. Depending on the context, you may find one technique better suited than the other for your current situation.

### With a getter

With this technique, you define the behavior in `beforeEach` and then use a local variable to change the value returned by the getter.

```ts {3,6,7,12}
describe('AccessControlService', () => {
    let service: AccessControlService;
    let isAuthenticated: boolean;

    beforeEach(() => {
        isAuthenticated = false;
        when(getMock(AuthService).isAuthenticated).useGetter(() => isAuthenticated);
        service = getService(AccessControlService);
    });

    it('redirects to logout when trying to access the lobby while authenticated', () => {
        isAuthenticated = true; // Override the default value
        const result = service.checkAccess('lobby');
        expect(result).toBe(false);
    });
});
```

:::caution
Remember to initialize all variables in `beforeEach` and not in their declaration statement. Otherwise some test may get flaky as values from other tests start leaking.
:::

### Testing observable subscriptions

We would like our authentication service to actively publish authentication state changes with rxjs. We could implement it as shown here.

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

    private authenticatedSubject = new BehaviorSubject(false);

    public authenticated$(): Observable<boolean> {
        return this.authenticatedSubject.toObservable();
    }

    public setAuthenticated(value: boolean): void {
        this.authenticatedSubject.next(value);
    }
}
```

And the service we would like to test is subscribing to this observable in its constructor.

```ts
@Injectable()
export class MyService {

    constructor(
            readonly router: Router,
            readonly authService: AuthService) {
        this.authService.authenticated$.subscribe(auth => {
            if (!auth) {
                this.router.navigate(['/home']);
            }
        });
    }
}
```

We have to define the behavior of `authenticated$` before the service gets created. Otherwise OmniMock won't know what to do when authService is used.

Fortunately, we can call `getMock` before creating the actual service or component.

We could mock the rxjs API, expect a call to `subscribe`, register the callback and then invoke the callback. But this would be a lot of work.  
Instead, we can simply use rxjs in our test. This is a slight deviation to the true _test in a vacuum_ philosophy, but we can make an exception here because:
- rxjs is a single-purpose code utility library and we do not use it for I/O in this context.
- The class we are testing remains entirely isolated from all other code in our project.
- We trust rxjs to be sufficiently tested and of high quality such that it won't break our tests.
- rxjs is not used as a gateway to some global API or global state. Everything remains local to our test.

The last affirmation is not entirely true. rxjs might be using `setTimeout` or a similar I/O method to defer work internally. We must be careful to wrap everything in a `fakeAsync` context and call `flush()` such that this implementation detail doesn't interfere with our test.

```ts
describe('MyService', () => {
    let authenticated$: Subject<boolean>;

    beforeEach(() => {
        authenticated$ = new Subject<boolean>();
        when(getMock(AuthService).authenticated$).useValue(authenticated$);
        getService(MyService);
    });

    it('redirects to home when logging out', fakeAsync(() => {
        // Expect the call to router.navigate once
        when(getMock(Router).navigate(['/home'])).resolve(true).once();
        // Then, send the value to trigger the code we would like to test
        authenticated$.next(false);
        // Then, flush to make sure our fake event goes through
        flush();
    }));
});
```
