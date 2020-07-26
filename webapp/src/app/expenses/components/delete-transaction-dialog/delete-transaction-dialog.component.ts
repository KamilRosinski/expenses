import {Component} from '@angular/core';
import {DialogReference} from '../../../modal-dialog/model/dialog-reference';
import {Transaction} from '../../model/transaction';

@Component({
    templateUrl: './delete-transaction-dialog.component.html',
    styleUrls: ['./delete-transaction-dialog.component.scss']
})
export class DeleteTransactionDialogComponent {

    readonly transaction: Transaction;

    constructor(private readonly dialogReference: DialogReference) {
        this.transaction = dialogReference.data;
    }

    cancel(): void {
        this.dialogReference.close(false);
    }

    delete(): void {
        this.dialogReference.close(true);
    }

}
