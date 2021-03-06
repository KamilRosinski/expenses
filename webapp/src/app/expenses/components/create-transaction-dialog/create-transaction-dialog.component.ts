import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {CategoryWithSubcategories} from '../../model/category-with-subcategories';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Transaction} from '../../model/transaction';
import {Subcategory} from '../../model/subcategory';
import {Category} from '../../model/category';
import {MoneyUtils} from '../../utils/money.utils';
import {DialogReference} from '../../../modal-dialog/model/dialog-reference';
import {NotificationsService} from '../../../notifications/services/notifications.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    templateUrl: './create-transaction-dialog.component.html',
    styleUrls: ['./create-transaction-dialog.component.scss']
})
export class CreateTransactionDialogComponent implements OnInit {

    form: FormGroup;
    categories: CategoryWithSubcategories[];
    monthLength: number;

    private readonly uniqueCategoryValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
        control.value.category === 'new' && control.value.newCategory && this.categories.some((category: CategoryWithSubcategories) => category.name === control.value.newCategory)
            ? {nonUniqueCategory: control.value.newCategory}
            : null;

    private readonly uniqueSubcategoryValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const result: ValidationErrors | null = control.value.subcategory === 'new' && control.value.newSubcategory && control.value.category.subcategories.some((subcategory: Subcategory) => subcategory.name === control.value.newSubcategory)
            ? {nonUniqueSubcategory: control.value.newSubcategory}
            : null;
        return result;
    }

    private readonly newCategoryNotEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
        control.value.category === 'new' && !control.value.newCategory
            ? {emptyNewCategory: true}
            : null;

    private readonly newSubcategoryNotEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
        control.value.subcategory === 'new' && !control.value.newSubcategory
            ? {emptyNewSubcategory: true}
            : null;

    get days(): number[] {
        return Array.from(Array(this.monthLength).keys()).map((day: number) => day + 1);
    }

    get dayControl(): FormControl {
        return this.form.get('day') as FormControl;
    }

    get categoryControl(): FormControl {
        return this.form.get('category') as FormControl;
    }

    get newCategoryControl(): FormControl {
        return this.form.get('newCategory') as FormControl;
    }

    get subcategoryControl(): FormControl {
        return this.form.get('subcategory') as FormControl;
    }

    get newSubcategoryControl(): FormControl {
        return this.form.get('newSubcategory') as FormControl;
    }

    get descriptionControl(): FormControl {
        return this.form.get('description') as FormControl;
    }

    get valueControl(): FormControl {
        return this.form.get('value') as FormControl;
    }

    constructor(private readonly dialogReference: DialogReference,
                private readonly expensesService: ExpensesService,
                private readonly formBuilder: FormBuilder,
                private readonly notificationsService: NotificationsService) {
    }


    ngOnInit(): void {
        this.expensesService.getCategoriesWithSubcategories().subscribe({
            next: (categories: CategoryWithSubcategories[]) => this.categories = categories,
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to load categories. Following error occurred: ${error.message}.`)
        });
        this.form = this.formBuilder.group({
            day: [null, [Validators.required]],
            category: [null, [Validators.required]],
            newCategory: [null],
            subcategory: [{value: null, disabled: true}, [Validators.required]],
            newSubcategory: [null],
            description: [null],
            value: [null, [Validators.required, Validators.pattern(MoneyUtils.MONEY_PATTERN)]]
        }, {
            validators: [
                this.uniqueCategoryValidator,
                this.uniqueSubcategoryValidator,
                this.newCategoryNotEmptyValidator,
                this.newSubcategoryNotEmptyValidator
            ]
        });
        this.categoryControl.valueChanges.subscribe((category: CategoryWithSubcategories) => {
            this.subcategoryControl.setValue(null);
            if (category) {
                this.subcategoryControl.enable();
            } else {
                this.categoryControl.disable();
            }
        });
        this.monthLength = this.dialogReference.data;
    }

    cancel(): void {
        this.dialogReference.close();
    }

    submit(): void {

        const category: Category = this.form.value.category === 'new'
            ? {id: null, name: this.form.value.newCategory}
            : this.form.value.category;

        const subcategory: Subcategory = this.form.value.subcategory === 'new'
            ? {id: null, name: this.form.value.newSubcategory}
            : this.form.value.subcategory;

        const transaction: Transaction = {
            id: null,
            day: this.form.value.day,
            subcategory: {
                ...subcategory,
                category
            },
            description: this.form.value.description,
            value: MoneyUtils.convertMoneyToInt(this.form.value.value)
        };

        this.dialogReference.close(transaction);
    }


}
