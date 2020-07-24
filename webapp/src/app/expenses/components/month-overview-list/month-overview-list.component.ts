import {Component, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {MonthOverview} from '../../shared/month-overview';
import {DialogService} from '../../../modal-dialog/services/dialog.service';
import {MonthCreateComponent} from '../month-create/month-create.component';
import {concatMap, filter} from 'rxjs/operators';
import {Month} from '../../shared/month';
import {YearMonth} from '../../shared/year-month';
import {Router} from '@angular/router';
import {NotificationsService} from '../../../notifications/services/notifications.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    templateUrl: './month-overview-list.component.html',
    styleUrls: ['./month-overview-list.component.scss']
})
export class MonthOverviewListComponent implements OnInit {

    monthOverviews: MonthOverview[] = [];

    constructor(private readonly expensesService: ExpensesService,
                private readonly dialogService: DialogService,
                private readonly router: Router,
                private readonly notificationsService: NotificationsService) {
    }

    ngOnInit(): void {
        this.expensesService.getMonthOverviews().subscribe({
            next: (monthOverviews: MonthOverview[]) => this.monthOverviews = monthOverviews,
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to load months. Following error occurred: ${error.message}.`)
        });
    }

    createMonth(): void {
        this.dialogService.open(MonthCreateComponent, this.monthOverviews).closed.pipe(
            filter(Boolean),
            concatMap((yearMonth: YearMonth) => this.expensesService.createMonth(yearMonth))
        ).subscribe({
            next: (month: Month) => this.router.navigate(['expenses', 'month', month.id],
                {queryParams: {tab: 'transactions'}}).then(),
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to create month. Following error occurred: ${error.message}.`)
        });
    }

}
