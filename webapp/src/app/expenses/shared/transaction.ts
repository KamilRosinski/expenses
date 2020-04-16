import {TransactionCategory} from './transaction-category';

export interface Transaction {
    id: number;
    date: string;
    description: string;
    value: number;
    category: TransactionCategory;
}
