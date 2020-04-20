import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MonthOverviewListComponent} from './components/month-overview-list/month-overview-list.component';
import {MonthComponent} from './components/month/month.component';

const routes: Routes = [
    {path: '', component: MonthOverviewListComponent},
    {path: 'month/:id', component: MonthComponent}
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
