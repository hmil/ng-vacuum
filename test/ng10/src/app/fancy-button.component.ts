import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-fancy-button',
    templateUrl: './fancy-button.component.html'
})
export class FancyButtonComponent implements OnChanges, OnInit {

    @Input()
    public confirmLabel = 'Happy';

    @Input()
    public cancelLabel = 'Sad';

    @Output()
    public clicked = new EventEmitter<'confirm' | 'cancel'>();

    public description = '';

    public ngOnChanges(changes: SimpleChanges) {
        if ('confirmLabel' in changes || 'cancelLabel' in changes) {
            this.computeDescription();
        }
    }

    public ngOnInit() {
        this.computeDescription();
    }

    private computeDescription() {
        this.description = `Chose between ${this.confirmLabel} or ${this.cancelLabel}`;
    }

    public confirmClicked() {
        this.clicked.emit('confirm');
    }

    public cancelClicked() {
        this.clicked.emit('cancel');
    }
}
