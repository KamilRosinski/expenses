import {Component, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Month} from '../../shared/month';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {concatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Transaction} from '../../shared/transaction';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

    month: Month;
    transactionsTab$: Observable<boolean>;
    predictionsTab$: Observable<boolean>;

    constructor(private readonly expensesService: ExpensesService,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {

        this.activatedRoute.paramMap.pipe(
            concatMap((params: ParamMap) => this.expensesService.getMonthById(+params.get('id')))
        ).subscribe(
            (month: Month) => this.month = month
        );

        const currentTab$: Observable<string> = this.activatedRoute.queryParamMap.pipe(
            map((params: ParamMap) => params.get('tab'))
        );

        this.transactionsTab$ = currentTab$.pipe(map((currentTab: string) => currentTab === 'transactions'));
        this.predictionsTab$ = currentTab$.pipe(map((currentTab: string) => currentTab === 'predictions'));
    }

    createTransaction(transaction: Transaction): void {
        this.expensesService.createTransaction(this.month.id, transaction).subscribe(
            (transaction: Transaction) => this.month.transactions = [...this.month.transactions, transaction]
        );
    }

}
