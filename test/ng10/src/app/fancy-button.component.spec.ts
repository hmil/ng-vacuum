import { fakeAsync } from '@angular/core/testing';
import { BasePage, renderComponent } from 'ng-vacuum';

import { AppModule } from './app.module';
import { FancyButtonComponent } from './fancy-button.component';

describe('FancyButtonComponent', () => {

    it('shows default values', fakeAsync(() => {
        const page = new Page(renderComponent(FancyButtonComponent, AppModule));
        expect(page.confirmBtnLabel).toBe('Happy');
        expect(page.cancelBtnLabel).toBe('Sad');
        expect(page.description).toBe('Chose between Happy or Sad');
    }));

    it('shows confirm and cancel labels', fakeAsync(() => {
        const page = new Page(renderComponent(FancyButtonComponent, AppModule, {
            inputs: {
                confirmLabel: 'hello',
                cancelLabel: 'goodbye'
            }
        }));
        expect(page.confirmBtnLabel).toBe('hello');
        expect(page.cancelBtnLabel).toBe('goodbye');
        expect(page.description).toBe('Chose between hello or goodbye');
        page.setInputs({
            confirmLabel: 'Gruetzi',
            cancelLabel: 'Tschuss'
        });
        expect(page.confirmBtnLabel).toBe('Gruetzi');
        expect(page.cancelBtnLabel).toBe('Tschuss');
        expect(page.description).toBe('Chose between Gruetzi or Tschuss');
    }));

    it('emits click events', fakeAsync(() => {
        const page = new Page(renderComponent(FancyButtonComponent, AppModule));

        const emittedValues = page.outputs.clicked.capture();
        page.confirmBtn.click();
        expect(emittedValues).toEqual(['confirm']);

        page.cancelBtn.click();
        expect(emittedValues).toEqual(['confirm', 'cancel']);
    }));
});

class Page extends BasePage<FancyButtonComponent> {

    get confirmBtnLabel(): string {
        return this.confirmBtn.innerText;
    }

    get cancelBtnLabel(): string {
        return this.cancelBtn.innerText;
    }

    get description(): string {
        return (this.rendering.find('[test-id=description]').nativeElement as HTMLDivElement).innerText;
    }

    get confirmBtn(): HTMLButtonElement {
        return this.rendering.find('[test-id=confirm-btn]').nativeElement;
    }

    get cancelBtn(): HTMLButtonElement {
        return this.rendering.find('[test-id=cancel-btn]').nativeElement;
    }
}
