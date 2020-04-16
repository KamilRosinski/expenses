import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {AccountingPeriodListComponent} from './components/accounting-period-list/accounting-period-list.component';
import {AccountingPeriodComponent} from './components/accounting-period/accounting-period.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AccountingPeriodListComponent,
        AccountingPeriodComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
        ReactiveFormsModule
    ]
})
export class ExpensesModule {
}
