import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountingPeriodListComponent} from './components/accounting-period-list/accounting-period-list.component';
import {AccountingPeriodComponent} from './components/accounting-period/accounting-period.component';

const routes: Routes = [
    {path: '', component: AccountingPeriodListComponent},
    {path: 'accounting-period/:id', component: AccountingPeriodComponent}
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
