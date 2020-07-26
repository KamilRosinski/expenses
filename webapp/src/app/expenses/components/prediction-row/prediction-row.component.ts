import {Component, Input} from '@angular/core';
import {Prediction} from '../../model/prediction';
import {Transaction} from '../../model/transaction';

@Component({
    selector: 'tbody[app-prediction-row]',
    templateUrl: './prediction-row.component.html',
    styleUrls: ['./prediction-row.component.scss']
})
export class PredictionRowComponent {

    @Input() prediction: Prediction;
    @Input() transactions: Transaction[];

    showTransactions: boolean = false;

    get transactionsSum(): number {
        return this.transactions
            .map((transaction: Transaction) => transaction.value)
            .reduce((result: number, value: number) => result + value, 0);
    }

    toggleShowTransactions(): void {
        this.showTransactions = !this.showTransactions;
    }

}
