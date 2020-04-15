import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {MonthListComponent} from './components/month-list/month-list.component';
import {ExpenseListComponent} from './components/month/expense-list.component';


@NgModule({
    declarations: [
        MonthListComponent,
        ExpenseListComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
    ]
})
export class ExpensesModule {
}
