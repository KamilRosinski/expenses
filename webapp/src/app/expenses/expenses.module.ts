import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {MonthListComponent} from './components/month-list/month-list.component';
import {MonthComponent} from './components/month/month.component';


@NgModule({
    declarations: [
        MonthListComponent,
        MonthComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
    ]
})
export class ExpensesModule {
}
