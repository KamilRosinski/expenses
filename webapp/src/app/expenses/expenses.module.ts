import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {AccountingPeriodListComponent} from './components/accounting-period-list/accounting-period-list.component';
import {AccountingPeriodComponent} from './components/accounting-period/accounting-period.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateAccountingPeriodComponent} from './components/create-accounting-period/create-accounting-period.component';
import {CreateTransactionComponent} from './components/create-transaction/create-transaction.component';


@NgModule({
    declarations: [
        AccountingPeriodListComponent,
        AccountingPeriodComponent,
        CreateAccountingPeriodComponent,
        CreateTransactionComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
        ReactiveFormsModule
    ]
})
export class ExpensesModule {
}
