import {Component, OnInit} from '@angular/core';
import {AccountingPeriodService} from '../../services/accounting-period.service';
import {AccountingPeriod} from '../../shared/accounting-period';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {concatMap} from 'rxjs/operators';
import {Transaction} from '../../shared/transaction';

@Component({
    selector: 'app-accounting-period',
    templateUrl: './accounting-period.component.html',
    styleUrls: ['./accounting-period.component.scss']
})
export class AccountingPeriodComponent implements OnInit {

    accountingPeriod: AccountingPeriod;
    createTransactionFormVisible: boolean = false;

    constructor(private readonly accountingPeriodService: AccountingPeriodService,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.pipe(
            concatMap((params: ParamMap) => this.accountingPeriodService.getById(+params.get('id')))
        ).subscribe(
            (accountingPeriod: AccountingPeriod) => this.accountingPeriod = accountingPeriod
        );
    }

    createTransaction(transaction: Transaction): void {
        this.accountingPeriodService.createTransaction(this.accountingPeriod.id, transaction).subscribe(
            (transaction: Transaction) => {
                this.createTransactionFormVisible = false;
                this.accountingPeriod.transactions = [...this.accountingPeriod.transactions, transaction]
                    .sort((t1: Transaction, t2: Transaction) => t2.day - t1.day);
            }
        );
    }

}
