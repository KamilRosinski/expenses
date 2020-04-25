import {Component, Input} from '@angular/core';
import {Month} from '../../shared/month';
import {Transaction} from '../../shared/transaction';

@Component({
    selector: 'app-predictions-tab',
    templateUrl: './predictions-tab.component.html',
    styleUrls: ['./predictions-tab.component.scss']
})
export class PredictionsTabComponent {

    @Input() month: Month;

  filterTransactionsByCategory(categoryId: number): Transaction[] {
    return  this.month.transactions
        .filter((transaction: Transaction) => transaction.subcategory.category.id === categoryId)
  }

}
