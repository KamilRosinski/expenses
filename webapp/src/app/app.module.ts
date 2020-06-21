import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ModalDialogModule} from './modal-dialog/modal-dialog.module';
import {DeleteTransactionDialogComponent} from './expenses/components/delete-transaction-dialog/delete-transaction-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        DeleteTransactionDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ModalDialogModule
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        DeleteTransactionDialogComponent
    ]
})
export class AppModule {
}
