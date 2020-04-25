import {Category} from './category';

export interface SubcategoryWithCategory {
    readonly id: number;
    readonly name: string;
    readonly category: Category;
}