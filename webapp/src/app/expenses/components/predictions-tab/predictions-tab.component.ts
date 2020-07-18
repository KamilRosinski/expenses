import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Month} from '../../shared/month';
import {Transaction} from '../../shared/transaction';
import {Prediction} from '../../shared/prediction';
import {Category} from '../../shared/category';

@Component({
    selector: 'app-predictions-tab',
    templateUrl: './predictions-tab.component.html',
    styleUrls: ['./predictions-tab.component.scss']
})
export class PredictionsTabComponent {

    @Input() month: Month;

    filterTransactionsByCategory(categoryId: number): Transaction[] {
        return this.month.transactions
            .filter((transaction: Transaction) => transaction.subcategory.category.id === categoryId)
    }

}
