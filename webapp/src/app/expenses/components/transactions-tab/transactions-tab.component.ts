import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Month} from '../../shared/month';
import {Transaction} from '../../shared/transaction';
import {DialogService} from '../../../modal-dialog/services/dialog.service';
import {DeleteTransactionDialogComponent} from '../delete-transaction-dialog/delete-transaction-dialog.component';
import {filter} from 'rxjs/operators';
import {NotificationsService} from '../../../notifications/services/notifications.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-transactions-tab',
    templateUrl: './transactions-tab.component.html',
    styleUrls: ['./transactions-tab.component.scss']
})
export class TransactionsTabComponent {

    @Input() month: Month;

    @Output() deleteTransaction: EventEmitter<number> = new EventEmitter<number>();

    constructor(private readonly dialogService: DialogService) {
    }

    delete(transaction: Transaction): void {
        this.dialogService.open(DeleteTransactionDialogComponent, transaction).closed.pipe(
            filter(Boolean)
        ).subscribe(
            () => this.deleteTransaction.emit(transaction.id)
        );
    }

}
