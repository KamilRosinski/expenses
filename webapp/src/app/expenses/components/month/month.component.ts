import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ExpenseService} from '../../services/expense.service';
import {Observable} from 'rxjs';
import {Expense} from '../../shared/expense';
import {concatMap} from 'rxjs/operators';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

    expenses$: Observable<Expense[]>;

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly expenseService: ExpenseService) {
    }

    ngOnInit() {
        this.expenses$ = this.activatedRoute.paramMap.pipe(
            concatMap((params: ParamMap) =>
                this.expenseService.getExpensesByMonth(+params.get('year'), +params.get('month')))
        );
    }

}
