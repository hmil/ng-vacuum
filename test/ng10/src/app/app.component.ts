import { Component, Inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CONSOLE } from './auth/app.providers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    cancelLabel = 'Nooo';

    get isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    constructor(
        @Inject(CONSOLE) private readonly console: Console,
        private readonly authService: AuthService) { }

    public onLogin() {
        this.authService.setAuthenticated(true);
    }

    public onChoice(choice: 'confirm' | 'cancel') {
        this.console.log(choice);
    }
}
