import { Pipe, PipeTransform } from '@angular/core';
import {Transaction} from '../shared/transaction';
import {MonthOverview} from '../shared/month-overview';

@Pipe({
  name: 'monthOverviewsSort'
})
export class MonthOverviewsSortPipe implements PipeTransform {

  transform(monthOverviews: MonthOverview[]): MonthOverview[] {
    return [...monthOverviews].sort(
        (m1: MonthOverview, m2: MonthOverview) => (m1.year !== m2.year ? m2.year - m1.year : m2.month - m1.month)
    );
  }

}
