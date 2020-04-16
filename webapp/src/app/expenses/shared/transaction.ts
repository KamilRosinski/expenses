import {TransactionCategory} from './transaction-category';

export interface Transaction {
    readonly id: number;
    readonly day: number;
    readonly description?: string;
    readonly value: number;
    readonly category: TransactionCategory;
}
