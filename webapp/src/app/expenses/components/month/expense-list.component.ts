import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ExpenseService} from '../../services/expense.service';
import {Observable} from 'rxjs';
import {Expense} from '../../shared/expense';
import {concatMap, map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-month',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

    date: Date;
    expenses: Expense[] = [];

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly expenseService: ExpenseService) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParamMap.pipe(
            map((params: ParamMap) => ({year: +params.get('year'), month: +params.get('month')})),
            tap((date: {year: number, month: number}) => this.date = new Date(`${date.year}-${date.month}`)),
            concatMap((date: {year: number, month: number}) => this.expenseService.getExpensesByYearAndMonth(date.year, date.month))
        ).subscribe((expenses: Expense[]) => this.expenses.push(...expenses));
    }

    deleteExpense(id: number): void {
        this.expenseService.deleteExpenseById(id).subscribe(
            _ => this.expenses = this.expenses.filter((expense: Expense) => expense.id !== id)
        );
    }

}
