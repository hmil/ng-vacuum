import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AccessControlService } from './access-control.service';
import { AuthService } from './auth.service';

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
                { provide: Router, useValue: routerMock },
                AccessControlService
            ]
        });
        service = TestBed.inject(AccessControlService);
    });

    it('redirects to logout when trying to access the lobby while authenticated', () => {
        authServiceMock.isAuthenticated.and.returnValue(true);
        routerMock.navigate.and.returnValue(Promise.resolve(true));
        expect(service.checkAccess('lobby')).toBe(false);
        expect(routerMock.navigate).toHaveBeenCalledWith(['logout']);
    });
});
