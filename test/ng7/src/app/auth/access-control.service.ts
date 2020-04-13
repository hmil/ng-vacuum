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
