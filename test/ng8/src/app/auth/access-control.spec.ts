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
