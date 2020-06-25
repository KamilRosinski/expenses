import {Component, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Month} from '../../shared/month';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {concatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Transaction} from '../../shared/transaction';
import {Prediction} from '../../shared/prediction';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

    month: Month;
    currentTab$: Observable<string>;

    constructor(private readonly expensesService: ExpensesService,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {

        this.activatedRoute.paramMap.pipe(
            concatMap((params: ParamMap) => this.expensesService.getMonthById(+params.get('id')))
        ).subscribe(
            (month: Month) => this.month = month
        );

        this.currentTab$ = this.activatedRoute.queryParamMap.pipe(
            map((params: ParamMap) => params.get('tab'))
        );
    }

    createTransaction(transaction: Transaction): void {
        this.expensesService.createTransaction(this.month.id, transaction).subscribe(
            (transaction: Transaction) => this.month.transactions = [...this.month.transactions, transaction]
        );
    }

    deleteTransaction(transactionId: number): void {
        this.expensesService.deleteTransaction(transactionId).subscribe(() => {
            this.month.transactions = this.month.transactions.filter((transaction: Transaction) => transaction.id !== transactionId);
        });
    }

    createPrediction(prediction: Prediction): void {
        this.expensesService.createPrediction(this.month.id, prediction).subscribe(
            (prediction: Prediction) => this.month.predictions = [...this.month.predictions, prediction]
        );
    }

}
