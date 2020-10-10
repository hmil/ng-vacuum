import { fakeAsync } from '@angular/core/testing';
import { BasePage, getShallow, renderComponent } from 'ng-vacuum';

import { AppModule } from './app.module';
import { FancyButtonComponent } from './fancy-button.component';

describe('FancyButtonComponent', () => {

    let page: Page;

    it('shows default values', fakeAsync(async () => {
        page = new Page(await renderComponent(FancyButtonComponent, AppModule));
        expect(page.confirmBtnLabel).toBe('Happy');
        expect(page.cancelBtnLabel).toBe('Sad');
        expect(page.description).toBe('Chose between Happy or Sad');
    }));

    it('shows confirm and cancel labels', fakeAsync(async () => {
        page = new Page(await getShallow(FancyButtonComponent, AppModule).render({
            bind: {
                confirmLabel: 'hello',
                cancelLabel: 'goodbye'
            }
        }));
        expect(page.confirmBtnLabel).toBe('hello');
        expect(page.cancelBtnLabel).toBe('goodbye');
        expect(page.description).toBe('Chose between hello or goodbye');
        page.setBoundValues({
            confirmLabel: 'Gruetzi',
            cancelLabel: 'Tschuss'
        });
        expect(page.confirmBtnLabel).toBe('Gruetzi');
        expect(page.cancelBtnLabel).toBe('Tschuss');
        expect(page.description).toBe('Chose between Gruetzi or Tschuss');
    }));
});

class Page extends BasePage<FancyButtonComponent> {

    get confirmBtnLabel(): string {
        return (this.rendering.find('[test-id=confirm-btn]').nativeElement as HTMLButtonElement).innerText;
    }

    get cancelBtnLabel() {
        return (this.rendering.find('[test-id=cancel-btn]').nativeElement as HTMLButtonElement).innerText;
    }

    get description() {
        return (this.rendering.find('[test-id=description]').nativeElement as HTMLDivElement).innerText;
    }
}
