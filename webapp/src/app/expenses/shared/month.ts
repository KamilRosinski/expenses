import {Transaction} from './transaction';
import {Prediction} from './prediction';

export interface Month {
    readonly id: number;
    readonly yearMonth: string;
    readonly length: number;
    readonly transactions: Transaction[];
    readonly predictions: Prediction[];
}
