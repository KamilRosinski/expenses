import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MonthOverview} from '../shared/month-overview';
import {Month} from '../shared/month';
import {CategoryWithSubcategories} from '../shared/category-with-subcategories';
import {Transaction} from '../shared/transaction';

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

    getCategoriesWithSubcategories(): Observable<CategoryWithSubcategories[]> {
        return this.http.get<CategoryWithSubcategories[]>('/api/category');
    }

    createTransaction(monthId: number, transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(`/api/month/${monthId}/transaction`, transaction);
    }

}
