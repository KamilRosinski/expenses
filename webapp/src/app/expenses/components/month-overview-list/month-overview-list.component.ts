import {Component, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {MonthOverview} from '../../shared/month-overview';
import {DialogService} from '../../../modal-dialog/services/dialog.service';
import {MonthCreateComponent} from '../month-create/month-create.component';
import {concatMap, filter} from 'rxjs/operators';
import {Month} from '../../shared/month';
import {YearMonth} from '../../shared/year-month';
import {Router} from '@angular/router';

@Component({
    selector: 'app-month-overview-list',
    templateUrl: './month-overview-list.component.html',
    styleUrls: ['./month-overview-list.component.scss']
})
export class MonthOverviewListComponent implements OnInit {

    monthOverviews: MonthOverview[] = [];

    constructor(private readonly expensesService: ExpensesService,
                private readonly dialogService: DialogService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.expensesService.getMonthOverviews().subscribe(
            (monthOverviews: MonthOverview[]) => this.monthOverviews = monthOverviews
        );
    }

    createMonth(): void {
        this.dialogService.open(MonthCreateComponent, this.monthOverviews).closed.pipe(
            filter(Boolean),
            concatMap((yearMonth: YearMonth) => this.expensesService.createMonth(yearMonth))
        ).subscribe(
            (month: Month) => this.router.navigate(
                ['expenses', 'month', month.id],
                {queryParams: {tab: 'transactions'}}
            ).then());
    }

}
