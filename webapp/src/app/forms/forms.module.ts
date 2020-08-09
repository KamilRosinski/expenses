import {NgModule} from '@angular/core';
import {InputComponent} from './components/input/input.component';
import {InputRefDirective} from './directives/input-ref.directive';
import {CommonModule} from '@angular/common';
import {FormComponent} from './components/form/form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        FormComponent,
        InputComponent,
        InputRefDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        FormComponent,
        InputComponent,
        InputRefDirective
    ]
})
export class FormsModule {
}
