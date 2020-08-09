import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'frm-form',
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.scss']
})
export class FormComponent {

    @Input() formGroup: FormGroup;

    @Output() submit: EventEmitter<never> = new EventEmitter<never>();

    onSubmit(): void {
        this.submit.emit();
    }

}
