import { Pipe, PipeTransform } from '@angular/core';
import {Transaction} from '../shared/transaction';

@Pipe({
  name: 'transactionsSort'
})
export class TransactionsSortPipe implements PipeTransform {

  transform(transactions: Transaction[]): Transaction[] {
    return [...transactions].sort(
        (t1: Transaction, t2: Transaction) => (t1.day !== t2.day ? t2.day - t1.day : t2.id - t1.id)
    );
  }

}
