import {NgModule} from '@angular/core';
import {InputComponent} from './components/input/input.component';
import {DisabledInputDirective} from './directives/disabled-input.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        InputComponent,
        DisabledInputDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        InputComponent,
        DisabledInputDirective
    ]
})
export class FormsModule {
}
