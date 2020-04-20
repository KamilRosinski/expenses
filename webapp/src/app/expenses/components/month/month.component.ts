import {Component, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Month} from '../../shared/month';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {concatMap} from 'rxjs/operators';
import {Transaction} from '../../shared/transaction';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

    month: Month;

    constructor(private readonly expensesService: ExpensesService,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.pipe(
            concatMap((params: ParamMap) => this.expensesService.getMonthById(+params.get('id')))
        ).subscribe(
            (month: Month) => this.month = month
        );
    }

    transactionsValueByCategoryId(categoryId: number): number {
        return  this.month.transactions
            .filter((transaction: Transaction) => transaction.subCategory.category.id === categoryId)
            .map((transaction: Transaction) => transaction.value)
            .reduce((result: number, value: number) => result + value);
    }

}
