import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MonthsComponent} from './components/months/months.component';
import {MonthComponent} from './components/month/month.component';

const routes: Routes = [
    {path: '', component: MonthsComponent},
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
