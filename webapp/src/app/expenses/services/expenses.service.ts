import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MonthOverview} from '../shared/month-overview';
import {Month} from '../shared/month';

@Injectable({
    providedIn: 'root'
})
export class ExpensesService {

    constructor(private readonly http: HttpClient) {
    }

    getMonthOverviews(): Observable<MonthOverview[]> {
        return this.http.get<MonthOverview[]>('/api/month/overview');
    }

    getMonthById(id: number): Observable<Month> {
        return this.http.get<Month>(`/api/month/${id}`);
    }

}
