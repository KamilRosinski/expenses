import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../../services/expense.service';
import {Observable} from 'rxjs';
import {MonthOverview} from '../../shared/month-overview';

@Component({
    selector: 'app-month-list',
    templateUrl: './month-list.component.html',
    styleUrls: ['./month-list.component.scss']
})
export class MonthListComponent implements OnInit {

    months$: Observable<MonthOverview[]>;

    constructor(private readonly expenseService: ExpenseService) {
    }

    ngOnInit() {
        this.months$ = this.expenseService.getMonths();
    }

}
