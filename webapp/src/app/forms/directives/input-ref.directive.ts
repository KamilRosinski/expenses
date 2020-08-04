import {Directive, ElementRef} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Directive({
    selector: 'select'
})
export class InputRefDirective {

    constructor(private readonly elementRef: ElementRef<AbstractControl>) {
    }

    get disabled(): boolean {
        return this.elementRef.nativeElement.disabled;
    }

    get invalid(): boolean {
        console.log(this.elementRef.nativeElement);
        return this.elementRef.nativeElement.invalid;
    }

}
