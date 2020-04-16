import {Component, OnInit} from '@angular/core';
import {AccountingPeriodService} from '../../services/accounting-period.service';
import {AccountingPeriodOverview} from '../../shared/accounting-period-overview';

@Component({
    selector: 'app-accounting-period-list',
    templateUrl: './accounting-period-list.component.html',
    styleUrls: ['./accounting-period-list.component.scss']
})
export class AccountingPeriodListComponent implements OnInit {

    accountingPeriodOverviews: AccountingPeriodOverview[];

    constructor(private readonly accountingPeriodService: AccountingPeriodService) {
    }

    ngOnInit() {
        this.accountingPeriodService.getOverviews().subscribe(
            (accountingPeriodOverviews: AccountingPeriodOverview[]) => this.accountingPeriodOverviews = accountingPeriodOverviews
        );
    }

}
