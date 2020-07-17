import {Component, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Month} from '../../shared/month';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {concatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Transaction} from '../../shared/transaction';
import {Prediction} from '../../shared/prediction';
import {NotificationsService} from '../../../notifications/services/notifications.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

    month: Month;
    currentTab$: Observable<string>;

    constructor(private readonly expensesService: ExpensesService,
                private readonly activatedRoute: ActivatedRoute,
                private readonly notificationsService: NotificationsService) {
    }

    ngOnInit(): void {

        this.activatedRoute.paramMap.pipe(
            concatMap((params: ParamMap) => this.expensesService.getMonthById(+params.get('id')))
        ).subscribe({
            next: (month: Month) => this.month = month,
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to load expenses. Following error occurred: ${error.message}.`)
        });

        this.currentTab$ = this.activatedRoute.queryParamMap.pipe(
            map((params: ParamMap) => params.get('tab'))
        );
    }

    createTransaction(transaction: Transaction): void {
        this.expensesService.createTransaction(this.month.id, transaction).subscribe({
            next: (transaction: Transaction) => this.month.transactions = [...this.month.transactions, transaction],
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to create transaction. Following error occurred: ${error.message}.`)
        });
    }

    deleteTransaction(transactionId: number): void {
        this.expensesService.deleteTransaction(transactionId).subscribe({
            next: () => this.month.transactions = this.month.transactions.filter((transaction: Transaction) => transaction.id !== transactionId),
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to delete transaction. Following error occurred: ${error.message}.`)
        });
    }

    createPrediction(prediction: Prediction): void {
        this.expensesService.createPrediction(this.month.id, prediction).subscribe({
            next: (prediction: Prediction) => this.month.predictions = [...this.month.predictions, prediction],
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to create prediction. Following error occurred: ${error.message}.`)
        });
    }

}
