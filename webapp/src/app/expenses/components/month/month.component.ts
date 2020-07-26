import {Component, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Month} from '../../model/month';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {concatMap, filter, map} from 'rxjs/operators';
import {Transaction} from '../../model/transaction';
import {Prediction} from '../../model/prediction';
import {NotificationsService} from '../../../notifications/services/notifications.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DialogService} from '../../../modal-dialog/services/dialog.service';
import {CreateTransactionDialogComponent} from '../create-transaction-dialog/create-transaction-dialog.component';
import {CreatePredictionDialogComponent} from '../create-prediction-dialog/create-prediction-dialog.component';

@Component({
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

    readonly TRANSACTIONS_TAB: string = 'transactions';
    readonly PREDICTIONS_TAB: string = 'predictions';

    month: Month;
    currentTab: string;

    constructor(private readonly expensesService: ExpensesService,
                private readonly activatedRoute: ActivatedRoute,
                private readonly dialogService: DialogService,
                private readonly notificationsService: NotificationsService) {
    }

    ngOnInit(): void {

        this.activatedRoute.paramMap.pipe(
            concatMap((params: ParamMap) => this.expensesService.getMonthById(+params.get('id')))
        ).subscribe({
            next: (month: Month) => this.month = month,
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to load expenses. Following error occurred: ${error.message}.`)
        });

        this.activatedRoute.queryParamMap.pipe(
            map((params: ParamMap) => params.get('tab'))
        ).subscribe(
            (currentTab: string) => this.currentTab = currentTab
        );
    }

    create(): void {
        switch (this.currentTab) {
            case this.TRANSACTIONS_TAB:
                this.createTransaction();
                break;
            case this.PREDICTIONS_TAB:
                this.createPrediction();
                break;
        }
    }

    createTransaction(): void {
        this.dialogService.open(CreateTransactionDialogComponent, this.month.length).closed.pipe(
            filter(Boolean),
            concatMap((transaction: Transaction) => this.expensesService.createTransaction(this.month.id, transaction))
        ).subscribe({
            next: (transaction: Transaction) => this.month.transactions = [...this.month.transactions, transaction],
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to create transaction. Following error occurred: ${error.message}.`)
        });
    }

    createPrediction(): void {
        const unavailableCategoryIds: number[] = this.month.predictions.map((prediction: Prediction) => prediction.category.id);
        this.dialogService.open(CreatePredictionDialogComponent, unavailableCategoryIds).closed.pipe(
            filter(Boolean),
            concatMap((prediction: Prediction) => this.expensesService.createPrediction(this.month.id, prediction))
        ).subscribe({
            next: (prediction: Prediction) => this.month.predictions = [...this.month.predictions, prediction],
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to create prediction. Following error occurred: ${error.message}.`)
        });
    }

    deleteTransaction(transactionId: number): void {
        this.expensesService.deleteTransaction(transactionId).subscribe({
            next: () => this.month.transactions = this.month.transactions.filter((transaction: Transaction) => transaction.id !== transactionId),
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to delete transaction. Following error occurred: ${error.message}.`)
        });
    }

}
