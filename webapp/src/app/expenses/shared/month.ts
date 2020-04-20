import {Transaction} from './transaction';

export interface Month {
    readonly id: number;
    readonly yearMonth: string;
    readonly length: number;
    transactions: Transaction[];
}
