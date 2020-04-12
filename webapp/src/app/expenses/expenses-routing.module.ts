import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MonthListComponent} from './components/month-list/month-list.component';
import {MonthComponent} from './components/month/month.component';

const routes: Routes = [
    {path: '', component: MonthListComponent},
    {path: 'year/:year/month/:month', component: MonthComponent}
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
