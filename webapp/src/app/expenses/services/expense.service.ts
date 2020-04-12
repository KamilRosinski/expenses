import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MonthOverview} from '../shared/month-overview';
import {map} from 'rxjs/operators';
import {Expense} from '../shared/expense';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {

    constructor(private readonly http: HttpClient) {
    }

    getMonths(): Observable<MonthOverview[]> {
        return this.http.get('/api/expense/months').pipe(
            map((response: any[]) => response.map((value: any) => {
                let year: number;
                let month: number;
                [year, month] = value.yearMonth.split('-');
                return {
                    yearMonth: new Date(year, month - 1),
                    income: value.income,
                    outcome: value.outcome
                }
            }))
        );
    }

    getExpensesByMonth(year: number, month: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`/api/expense/year/${year}/month/${month + 1}`);
    }

}
