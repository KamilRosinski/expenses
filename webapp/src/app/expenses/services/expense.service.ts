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

    private static readonly URL: string = '/api/expense';

    constructor(private readonly http: HttpClient) {
    }

    getMonths(): Observable<MonthOverview[]> {
        return this.http.get(`${ExpenseService.URL}/month-overview`).pipe(
            map((response: any[]) => response.map((value: any) => ({
                ...value,
                yearMonth: new Date(value.yearMonth),
            })))
        );
    }

    getExpensesByYearAndMonth(date: Date): Observable<Expense[]> {
        return this.http.get<Expense[]>(ExpenseService.URL, {
            params: {
                year: `${date.getFullYear()}`,
                month: `${date.getMonth() + 1}`
            }
        });
    }

}
