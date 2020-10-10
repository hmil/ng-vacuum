import { AppComponent } from './app.component';
import { BasePage, renderComponent, getMock } from 'ng-vacuum';
import { AppModule } from './app.module';
import { when } from 'omnimock';
import { AuthService } from './auth/auth.service';
import { fakeAsync } from '@angular/core/testing';
import { FancyButtonComponent } from './fancy-button.component';
import { CONSOLE } from './auth/app.providers';

describe('AppComponent', () => {

    let isAuthenticated: boolean;

    function createPage() {
        isAuthenticated = false;
        when(getMock(AuthService).isAuthenticated()).useGetter(() => isAuthenticated);
        page = new Page(renderComponent(AppComponent, AppModule));
    }

    it('lets user log in when not authenticated', fakeAsync(() => {
        const page = createPage();
        when(getMock(AuthService).setAuthenticated(true)).return().once();
        page.detectChanges();
        page.loginButton.click();
        expect().nothing();
    }));

    it('presents a fancy button when authenticated', fakeAsync(() => {
        const page = createPage();
        isAuthenticated = true;
        page.detectChanges();
        expect(page.fancyButton.confirmLabel).toBe('Got it');
        expect(page.fancyButton.cancelLabel).toBe('Nooo');
        when(getMock(CONSOLE).log('confirm')).return().once();
        page.fancyButton.clicked.emit('confirm');
    }));
});

class Page extends BasePage<AppComponent> {

    get loginButton(): HTMLElement {
        return this.rendering.find('[test-id=login-button]').nativeElement;
    }

    get fancyButton() {
        return this.rendering.findComponent(FancyButtonComponent);
    }
}
