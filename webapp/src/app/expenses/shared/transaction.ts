import {SubcategoryWithCategory} from './subcategory-with-category';

export interface Transaction {
    readonly id: number;
    readonly day: number;
    readonly description?: string;
    readonly value: number;
    readonly subcategory: SubcategoryWithCategory;
}
