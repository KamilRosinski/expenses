import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {MonthsComponent} from './components/months/months.component';
import {MonthComponent} from './components/month/month.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PredictionRowComponent} from './components/prediction-row/prediction-row.component';
import {TransactionsTabComponent} from './components/transactions-tab/transactions-tab.component';
import {PredictionsTabComponent} from './components/predictions-tab/predictions-tab.component';
import {CreateTransactionDialogComponent} from './components/create-transaction-dialog/create-transaction-dialog.component';
import {TransactionsSortPipe} from './pipes/transactions-sort.pipe';
import {PredictionsSortPipe} from './pipes/predictions-sort.pipe';
import {MonthOverviewsSortPipe} from './pipes/month-overviews-sort.pipe';
import {CreateMonthDialogComponent} from './components/create-month-dialog/create-month-dialog.component';
import {CreatePredictionDialogComponent} from './components/create-prediction-dialog/create-prediction-dialog.component';
import {CurrencyPlnPipe} from './pipes/currency-pln.pipe';
import {DeleteTransactionDialogComponent} from './components/delete-transaction-dialog/delete-transaction-dialog.component';
import {ModalDialogModule} from '../modal-dialog/modal-dialog.module';
import {NotificationsModule} from '../notifications/notifications.module';


@NgModule({
    declarations: [
        MonthsComponent,
        MonthComponent,
        PredictionRowComponent,
        TransactionsTabComponent,
        PredictionsTabComponent,
        CreateTransactionDialogComponent,
        TransactionsSortPipe,
        PredictionsSortPipe,
        MonthOverviewsSortPipe,
        CreateMonthDialogComponent,
        CreatePredictionDialogComponent,
        CurrencyPlnPipe,
        DeleteTransactionDialogComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
        ReactiveFormsModule,
        ModalDialogModule,
        NotificationsModule
    ]
})
export class ExpensesModule {
}
