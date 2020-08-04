import {Component, ContentChild} from '@angular/core';
import {InputRefDirective} from '../../directives/input-ref.directive';

@Component({
    selector: 'frm-input',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.scss']
})
export class InputComponent {

    @ContentChild(InputRefDirective, {static: true})
    input: InputRefDirective;

}