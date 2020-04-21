import {Component, Input} from '@angular/core';
import {Prediction} from '../../shared/prediction';
import {Transaction} from '../../shared/transaction';

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
            .reduce((result: number, value: number) => result + value);
    }

    toggleShowTransactions(): void {
        this.showTransactions = !this.showTransactions;
    }

}
