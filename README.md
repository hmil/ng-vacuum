# NgVacuum [![Build Status](https://travis-ci.org/hmil/ng-vacuum.svg?branch=master)](https://travis-ci.org/hmil/ng-vacuum)

_Angular tests in a vacuum._

---

NgVacuum lets you write true unit tests for your Angular components and services in complete isolation and with minimal boilerplate.

This is what a typical test with NgVacuum looks like.

```ts
describe('AccessControlService', () => {
    let service: AccessControlService;

    beforeEach(() => {
        service = getService(AccessControlService);
    });

    it('redirects to logout when accessing the lobby while authenticated', () => {
        when(getMock(AuthService).isAuthenticated()).return(true);
        when(getMock(Router).navigate(['logout'])).resolve(true).once();
        expect(service.checkAccess('lobby')).toBe(false);
    });
});
```

The same test written with the stock angular tools is shown below.

```ts
describe('AccessControlService', () => {
    let service: AccessControlService;
    let authServiceMock: jasmine.SpyObj<AuthService>;
    let routerMock: jasmine.SpyObj<Router>;

    beforeEach(() => {
        authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', [
            'isAuthenticated'
        ]);
        routerMock = jasmine.createSpyObj<Router>('Router', [
            'navigate'
        ]);
        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock},
                AccessControlService
            ]
        });
        service = TestBed.inject(AccessControlService);
    });

    it('redirects to logout when accessing the lobby while authenticated', () => {
        authServiceMock.isAuthenticated.and.returnValue(true);
        routerMock.navigate.and.returnValue(Promise.resolve(true));
        expect(service.checkAccess('lobby')).toBe(false);
        expect(routerMock.navigate).toHaveBeenCalledWith(['logout']);
    });
});
```

This example barly scratches the surface. NgVacuum packs a ton of useful features like shallow rendering and type-safe mocks which are designed to maximize the usefulness of unit tests while minimizing their maintainance cost.

Read the [online documentation](https://code.hmil.fr/ng-vacuum/) to get started.

---

Roadmap

- [x] PoC
- [x] Packaging
- [x] Doc site
- [x] Document service tests
- [ ] Document component tests
- [ ] Test component tests
- [ ] Finalize API doc
