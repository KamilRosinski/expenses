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

    @Output() createPrediction: EventEmitter<Prediction> = new EventEmitter<Prediction>();

    createFormVisible: boolean = false;

    filterTransactionsByCategory(categoryId: number): Transaction[] {
        return this.month.transactions
            .filter((transaction: Transaction) => transaction.subcategory.category.id === categoryId)
    }

    addPrediction(prediction: Prediction): void {
        this.createPrediction.emit(prediction);
        this.createFormVisible = false;
    }

    extractPredictionCategoryIds(): number[] {
        return this.month.predictions.map((prediction: Prediction) => prediction.category.id);
    }

}
