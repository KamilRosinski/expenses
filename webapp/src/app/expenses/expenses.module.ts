import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpensesRoutingModule} from './expenses-routing.module';
import {MonthOverviewListComponent} from './components/month-overview-list/month-overview-list.component';
import {MonthComponent} from './components/month/month.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PredictionRowComponent} from './components/prediction-row/prediction-row.component';
import {TransactionsTabComponent} from './components/transactions-tab/transactions-tab.component';
import {PredictionsTabComponent} from './components/predictions-tab/predictions-tab.component';


@NgModule({
    declarations: [
        MonthOverviewListComponent,
        MonthComponent,
        PredictionRowComponent,
        TransactionsTabComponent,
        PredictionsTabComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
        ReactiveFormsModule
    ]
})
export class ExpensesModule {
}
