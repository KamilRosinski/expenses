import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './components/dialog/dialog.component';
import { InsertionDirective } from './directives/insertion.directive';

@NgModule({
    declarations: [
        DialogComponent,
        InsertionDirective
    ],
    imports: [
        CommonModule
    ]
})
export class ModalDialogModule {
}
