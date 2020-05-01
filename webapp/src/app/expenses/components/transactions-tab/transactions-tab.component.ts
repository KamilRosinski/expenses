import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Month} from '../../shared/month';
import {Transaction} from '../../shared/transaction';

@Component({
    selector: 'app-transactions-tab',
    templateUrl: './transactions-tab.component.html',
    styleUrls: ['./transactions-tab.component.scss']
})
export class TransactionsTabComponent {

    @Input() month: Month;

    @Output() createTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>();

    createFormVisible: boolean = false;

    addTransaction(transaction: Transaction): void {
        this.createTransaction.emit(transaction);
        this.createFormVisible = false;
    }

}
