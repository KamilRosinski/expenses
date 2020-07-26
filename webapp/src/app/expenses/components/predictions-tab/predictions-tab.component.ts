import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Month} from '../../model/month';
import {Transaction} from '../../model/transaction';
import {Prediction} from '../../model/prediction';
import {Category} from '../../model/category';

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
