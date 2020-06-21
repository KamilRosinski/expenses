import {Component, Inject, Injector, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Transaction} from '../../shared/transaction';

@Component({
    selector: 'app-delete-transaction-dialog',
    templateUrl: './delete-transaction-dialog.component.html',
    styleUrls: ['./delete-transaction-dialog.component.scss']
})
export class DeleteTransactionDialogComponent {

  constructor(@Inject('DIALOG_DATA') public readonly transaction: Transaction,
              private readonly expensesService: ExpensesService) {
  }

    close(): void {
        console.log('closing dialog');
    }

}
