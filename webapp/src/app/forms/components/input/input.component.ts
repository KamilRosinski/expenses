import {Component, ContentChild, Input} from '@angular/core';
import {InputRefDirective} from '../../directives/input-ref.directive';

@Component({
    selector: 'frm-input',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.scss']
})
export class InputComponent {

    @ContentChild(InputRefDirective, {static: true})
    inputRef: InputRefDirective;

    @Input() invalid: boolean = false;

    @Input() set disabled(disabled: boolean) {
        console.log(`${disabled} => ${disabled === undefined || disabled}`);
        console.log(this.inputRef);
        this.inputRef.disabled = disabled === undefined || disabled;
    }

    get disabled(): boolean {
        return this.inputRef.disabled;
    }

}