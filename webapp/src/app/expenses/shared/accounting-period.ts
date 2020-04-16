import {Transaction} from './transaction';

export interface AccountingPeriod {
    id: number;
    startDate: string;
    endDate: string;
    transactions: Transaction[];
}
