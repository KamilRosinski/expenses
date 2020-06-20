import {Component} from '@angular/core';

@Component({
  selector: 'app-delete-transaction-dialog',
  templateUrl: './delete-transaction-dialog.component.html',
  styleUrls: ['./delete-transaction-dialog.component.scss']
})
export class DeleteTransactionDialogComponent {

  close(): void {
    console.log('closing dialog');
  }

}
