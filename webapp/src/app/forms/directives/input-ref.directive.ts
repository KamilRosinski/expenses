import {Directive} from '@angular/core';
import {FormControl, NgControl} from '@angular/forms';

@Directive({
    selector: 'select, input'
})
export class InputRefDirective {

    constructor(private readonly control: NgControl) {
    }

    set disabled(disabled: boolean) {
        const formControl: FormControl = this.control.control as FormControl
        if (disabled) {
            formControl.disable();
        } else {
            formControl.enable();
        }
    }

    get disabled(): boolean {
        return this.control.control.disabled;
    }

}
