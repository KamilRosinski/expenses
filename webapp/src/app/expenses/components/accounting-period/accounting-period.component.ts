import {Component, OnInit} from '@angular/core';
import {AccountingPeriodService} from '../../services/accounting-period.service';
import {AccountingPeriod} from '../../shared/accounting-period';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {concatMap} from 'rxjs/operators';

@Component({
    selector: 'app-accounting-period',
    templateUrl: './accounting-period.component.html',
    styleUrls: ['./accounting-period.component.scss']
})
export class AccountingPeriodComponent implements OnInit {

    accountingPeriod: AccountingPeriod;

    constructor(private readonly accountingPeriodService: AccountingPeriodService,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.pipe(
            concatMap((params: ParamMap) => this.accountingPeriodService.getById(+params.get('id')))
        ).subscribe(
            (accountingPeriod: AccountingPeriod) => this.accountingPeriod = accountingPeriod
        );
    }

}
