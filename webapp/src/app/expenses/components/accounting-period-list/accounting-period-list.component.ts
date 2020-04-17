import {Component, OnInit} from '@angular/core';
import {AccountingPeriodService} from '../../services/accounting-period.service';
import {AccountingPeriodOverview} from '../../shared/accounting-period-overview';
import {AccountingPeriod} from '../../shared/accounting-period';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {YearMonth} from '../../shared/year-month';

@Component({
    selector: 'app-accounting-period-list',
    templateUrl: './accounting-period-list.component.html',
    styleUrls: ['./accounting-period-list.component.scss']
})
export class AccountingPeriodListComponent implements OnInit {

    accountingPeriodOverviews: AccountingPeriodOverview[] = [];

    get accountingPeriodYearMonths(): YearMonth[] {
        return this.accountingPeriodOverviews.map((ap: AccountingPeriodOverview) => {
            let year: number;
            let month: number;
            [year, month] = ap.yearMonth.split('-').map((s: string) => +s);
            return {year, month};
        });
    }

    constructor(private readonly accountingPeriodService: AccountingPeriodService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.accountingPeriodService.getOverviews().subscribe(
            (accountingPeriodOverviews: AccountingPeriodOverview[]) => this.accountingPeriodOverviews = accountingPeriodOverviews
        );
    }

    createAccountingPeriod(yearMonth: YearMonth): void {
        this.accountingPeriodService.createForMonth(yearMonth).pipe(
            map((accountingPeriod: AccountingPeriod) => accountingPeriod.id)
        ).subscribe(
            (id: number) => this.router.navigateByUrl(`expenses/accounting-period/${id}`).then()
        );
    }

}
