import {Category} from './category';

export interface Prediction {
    readonly id: number;
    readonly value: number;
    readonly category: Category;
}
