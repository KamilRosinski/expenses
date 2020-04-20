import {Category} from './category';

export interface Prediction {
    readonly id: number;
    readonly value: string;
    readonly category: Category;
}
