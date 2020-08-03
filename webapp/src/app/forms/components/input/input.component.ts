import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {DisabledInputDirective} from '../../directives/disabled-input.directive';

@Component({
    selector: 'frm-input',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.scss']
})
export class InputComponent implements OnInit {

    @ContentChild(DisabledInputDirective)
    input: DisabledInputDirective;

    ngOnInit(): void {
        console.log(this.input);
    }

}