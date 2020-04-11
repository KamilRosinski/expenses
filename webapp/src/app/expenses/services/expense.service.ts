import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MonthOverview} from '../shared/month-overview';
import {map} from 'rxjs/operators';

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
                    balance: value.balance
                }
            }))
        );
    }

}
