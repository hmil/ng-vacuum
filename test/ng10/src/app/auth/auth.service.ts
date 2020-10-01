import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authenticated = false;

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public setAuthenticated(value: boolean): void {
        this.authenticated = value;
    }
}
