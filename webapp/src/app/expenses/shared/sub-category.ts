import {Category} from './category';

export interface SubCategory {
    readonly id: number;
    readonly name: string;
    readonly category: Category;
}