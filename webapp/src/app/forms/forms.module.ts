import {NgModule} from '@angular/core';
import {InputComponent} from './components/input/input.component';
import {InputRefDirective} from './directives/input-ref.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        InputComponent,
        InputRefDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        InputComponent,
        InputRefDirective
    ]
})
export class FormsModule {
}
