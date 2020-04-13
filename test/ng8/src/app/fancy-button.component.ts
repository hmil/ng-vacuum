import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-fancy-button',
    templateUrl: './fancy-button.component.html'
})
export class FancyButtonComponent {

    @Input()
    public confirmLabel = 'Happy';

    @Input()
    public cancelLabel = 'Sad';

    @Output()
    public clicked = new EventEmitter<'confirm' | 'cancel'>();

    public confirmClicked() {
        this.clicked.emit('confirm');
    }

    public cancelClicked() {
        this.clicked.emit('cancel');
    }
}
