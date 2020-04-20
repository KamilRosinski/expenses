import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {MonthOverviewListComponent} from './components/month-overview-list/month-overview-list.component';
import {MonthComponent} from './components/month/month.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        MonthOverviewListComponent,
        MonthComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
        ReactiveFormsModule
    ]
})
export class ExpensesModule {
}
