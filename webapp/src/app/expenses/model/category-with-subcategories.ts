import {Subcategory} from './subcategory';

export interface CategoryWithSubcategories {
    readonly id: number;
    readonly name: string;
    readonly subcategories: Subcategory[];
}
