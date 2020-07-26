import {Transaction} from './transaction';
import {Prediction} from './prediction';

export interface Month {
    readonly id: number;
    readonly year: number;
    readonly month: number;
    readonly length: number;
    transactions: Transaction[];
    predictions: Prediction[];
}
