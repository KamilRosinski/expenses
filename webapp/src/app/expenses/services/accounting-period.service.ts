import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountingPeriodOverview} from '../shared/accounting-period-overview';
import {AccountingPeriod} from '../shared/accounting-period';
import {Transaction} from '../shared/transaction';
import {TransactionCategory} from '../shared/transaction-category';

@Injectable({
    providedIn: 'root'
})
export class AccountingPeriodService {

    private static readonly URL: string = '/api/accounting-period';

    constructor(private readonly http: HttpClient) {
    }

    getOverviews(): Observable<AccountingPeriodOverview[]> {
        return this.http.get<AccountingPeriodOverview[]>(`${AccountingPeriodService.URL}/overview`);
    }

    getById(id: number): Observable<AccountingPeriod> {
        return this.http.get<AccountingPeriod>(`${AccountingPeriodService.URL}/${id}`);
    }

    createForMonth(yearMonth: string): Observable<AccountingPeriod> {
        return this.http.post<AccountingPeriod>(AccountingPeriodService.URL, yearMonth);
    }

    createTransaction(accountingPeriodId: number, transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(`${AccountingPeriodService.URL}/${accountingPeriodId}/transaction`, transaction);
    }

    getTransactionCategories(): Observable<TransactionCategory[]> {
        return this.http.get<TransactionCategory[]>(`${AccountingPeriodService.URL}/category/all`);
    }

}
