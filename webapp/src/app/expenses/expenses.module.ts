import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {MonthListComponent} from './components/month-list/month-list.component';


@NgModule({
    declarations: [
        MonthListComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
    ]
})
export class ExpensesModule {
}
