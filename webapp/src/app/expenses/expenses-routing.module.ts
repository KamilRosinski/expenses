import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MonthListComponent} from './components/month-list/month-list.component';
import {ExpenseListComponent} from './components/month/expense-list.component';

const routes: Routes = [
    {path: '', component: ExpenseListComponent},
    {path: 'overview', component: MonthListComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ExpensesRoutingModule {
}
