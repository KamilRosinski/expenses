import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {MonthOverviewListComponent} from './components/month-overview-list/month-overview-list.component';
import {MonthComponent} from './components/month/month.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PredictionRowComponent} from './components/prediction-row/prediction-row.component';
import {TransactionsTabComponent} from './components/transactions-tab/transactions-tab.component';
import {PredictionsTabComponent} from './components/predictions-tab/predictions-tab.component';
import {TransactionCreateComponent} from './components/transaction-create/transaction-create.component';
import {TransactionsSortPipe} from './pipes/transactions-sort.pipe';
import {PredictionsSortPipe} from './pipes/predictions-sort.pipe';
import {MonthOverviewsSortPipe} from './pipes/month-overviews-sort.pipe';
import {MonthCreateComponent} from './components/month-create/month-create.component';
import {PredictionCreateComponent} from './components/prediction-create/prediction-create.component';
import {CurrencyPlnPipe} from './pipes/currency-pln.pipe';
import {DeleteTransactionDialogComponent} from './components/delete-transaction-dialog/delete-transaction-dialog.component';
import {ModalDialogModule} from '../modal-dialog/modal-dialog.module';
import {NotificationsModule} from '../notifications/notifications.module';


@NgModule({
    declarations: [
        MonthOverviewListComponent,
        MonthComponent,
        PredictionRowComponent,
        TransactionsTabComponent,
        PredictionsTabComponent,
        TransactionCreateComponent,
        TransactionsSortPipe,
        PredictionsSortPipe,
        MonthOverviewsSortPipe,
        MonthCreateComponent,
        PredictionCreateComponent,
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
