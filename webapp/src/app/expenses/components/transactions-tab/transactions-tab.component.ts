import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Month} from '../../shared/month';
import {Transaction} from '../../shared/transaction';
import {DialogService} from '../../../modal-dialog/services/dialog.service';
import {DeleteTransactionDialogComponent} from '../delete-transaction-dialog/delete-transaction-dialog.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-transactions-tab',
    templateUrl: './transactions-tab.component.html',
    styleUrls: ['./transactions-tab.component.scss']
})
export class TransactionsTabComponent {

    @Input() month: Month;

    @Output() createTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>();

    createFormVisible: boolean = false;

    constructor(private readonly dialogService: DialogService) {
    }

    addTransaction(transaction: Transaction): void {
        this.createTransaction.emit(transaction);
        this.createFormVisible = false;
    }

    delete(transaction: Transaction): void {
        const dialogSubscription: Subscription = this.dialogService.open(DeleteTransactionDialogComponent, transaction).closed.subscribe(
            (value: boolean) => {
                console.log(value ? 'delete' : 'cancel');
                dialogSubscription.unsubscribe();
            }
        );
    }
}
