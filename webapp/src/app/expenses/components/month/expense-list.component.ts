import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ExpenseService} from '../../services/expense.service';
import {Observable} from 'rxjs';
import {Expense} from '../../shared/expense';
import {concatMap, map} from 'rxjs/operators';

@Component({
    selector: 'app-month',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

    date$: Observable<Date>;
    expenses$: Observable<Expense[]>;

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly expenseService: ExpenseService) {
    }

    ngOnInit() {
        this.date$ = this.activatedRoute.queryParamMap.pipe(
            map((params: ParamMap) => new Date(`${params.get('year')}-${params.get('month')}`))
        );
        this.expenses$ = this.date$.pipe(
            concatMap((date: Date) => this.expenseService.getExpensesByYearAndMonth(date))
        );
    }

}
