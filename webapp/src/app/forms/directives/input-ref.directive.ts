import {Directive} from '@angular/core';
import {FormControl, NgControl} from '@angular/forms';

@Directive({
    selector: 'select, input'
})
export class InputRefDirective {

    constructor(private readonly ngControl: NgControl) {
    }

    get disabled(): boolean {
        return this.ngControl.disabled;
    }

}
