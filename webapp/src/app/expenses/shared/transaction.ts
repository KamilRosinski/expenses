import {SubCategory} from './sub-category';

export interface Transaction {
    readonly id: number;
    readonly day: number;
    readonly description?: string;
    readonly value: number;
    readonly subCategory: SubCategory;
}
