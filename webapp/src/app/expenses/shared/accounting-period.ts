import {Transaction} from './transaction';

export interface AccountingPeriod {
    readonly id: number;
    readonly yearMonth: string;
    readonly length: number;
    transactions: Transaction[];
}
