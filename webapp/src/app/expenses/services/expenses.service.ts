import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MonthOverview} from '../shared/month-overview';
import {Month} from '../shared/month';
import {CategoryWithSubcategories} from '../shared/category-with-subcategories';
import {Transaction} from '../shared/transaction';
import {Category} from '../shared/category';
import {Prediction} from '../shared/prediction';
import {YearMonth} from '../shared/year-month';

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

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/category');
    }

    getCategoriesWithSubcategories(): Observable<CategoryWithSubcategories[]> {
        return this.http.get<CategoryWithSubcategories[]>('/api/category/subcategory');
    }

    createTransaction(monthId: number, transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(`/api/month/${monthId}/transaction`, transaction);
    }

    deleteTransaction(transactionId: number): Observable<void> {
        return this.http.delete<void>(`/api/transaction/${transactionId}`);
    }

    createPrediction(monthId: number, prediction: Prediction): Observable<Prediction> {
        return this.http.post<Prediction>(`/api/month/${monthId}/prediction`, prediction);
    }

    createMonth(yearMonth: YearMonth): Observable<Month> {
        return this.http.post<Month>('/api/month', yearMonth);
    }

}
