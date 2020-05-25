import {Component, OnInit} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {MonthOverview} from '../../shared/month-overview';

@Component({
    selector: 'app-month-overview-list',
    templateUrl: './month-overview-list.component.html',
    styleUrls: ['./month-overview-list.component.scss']
})
export class MonthOverviewListComponent implements OnInit {

    monthOverviews: MonthOverview[] = [];

    createFormVisible: boolean = false;

    constructor(private readonly expensesService: ExpensesService) {
    }

    ngOnInit(): void {
        this.expensesService.getMonthOverviews().subscribe(
            (monthOverviews: MonthOverview[]) => this.monthOverviews = monthOverviews
        );
    }

    extractYearMonths(): {year: number, month: number}[] {
        return this.monthOverviews.map((overview: MonthOverview) => ({year: overview.year, month: overview.month}));
    }

}
