import {Component, OnInit} from '@angular/core';
import {AccountingPeriodService} from '../../services/accounting-period.service';
import {AccountingPeriodOverview} from '../../shared/accounting-period-overview';
import {AccountingPeriod} from '../../shared/accounting-period';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-accounting-period-list',
    templateUrl: './accounting-period-list.component.html',
    styleUrls: ['./accounting-period-list.component.scss']
})
export class AccountingPeriodListComponent implements OnInit {

    accountingPeriodOverviews: AccountingPeriodOverview[] = [];

    get accountingPeriodYearMonths(): string[] {
        return this.accountingPeriodOverviews.map((ap: AccountingPeriodOverview) => ap.yearMonth);
    }

    constructor(private readonly accountingPeriodService: AccountingPeriodService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.accountingPeriodService.getOverviews().subscribe(
            (accountingPeriodOverviews: AccountingPeriodOverview[]) => this.accountingPeriodOverviews = accountingPeriodOverviews
        );
    }

    createAccountingPeriod(yearMonth: string): void {
        this.accountingPeriodService.createForMonth(yearMonth).pipe(
            map((accountingPeriod: AccountingPeriod) => accountingPeriod.id)
        ).subscribe(
            (id: number) => this.router.navigateByUrl(`expenses/accounting-period/${id}`).then()

        );
    }

}
