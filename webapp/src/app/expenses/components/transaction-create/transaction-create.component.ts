import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {CategoryWithSubcategories} from '../../shared/category-with-subcategories';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {Transaction} from '../../shared/transaction';
import {Subcategory} from '../../shared/subcategory';
import {Category} from '../../shared/category';

@Component({
    selector: 'app-transaction-create',
    templateUrl: './transaction-create.component.html',
    styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {

    private static readonly MONEY_PATTERN: RegExp = /^([+-]?[0-9]*)[,.]?([0-9]{0,2})$/;

    form: FormGroup;
    categories: CategoryWithSubcategories[];

    private readonly uniqueCategoryValidator: ValidatorFn = (control: FormControl): ValidationErrors | null =>
        control.value && this.categories.some((category: CategoryWithSubcategories) => category.name === control.value)
            ? {nonUniqueCategory: control.value}
            : null;

    private readonly uniqueSubcategoryValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
        control.value.newSubcategory && control.value.category !== 'new' && control.value.category.subcategories.includes((subcategory: Subcategory) => subcategory.name === control.value.newSubcategory)
            ? {nonUniqueSubcategory: control.value.newSubcategory}
            : null;

    private readonly newCategoryNotEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const result = control.value.category === 'new' && !control.value.newCategory
            ? {emptyNewCategory: true}
            : null;
        return result;
    }


    private readonly newSubcategoryNotEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
        control.value.subcategory === 'new' && !control.value.newSubcategory
            ? {emptyNewSubcategory: true}
            : null;

    @Input() monthLength: number;

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<Transaction> = new EventEmitter<Transaction>();

    get days(): number[] {
        return Array.from(Array(this.monthLength).keys()).map((day: number) => day + 1);
    }

    get dayControl(): AbstractControl {
        return this.form.get('day');
    }

    get categoryControl(): AbstractControl {
        return this.form.get('category');
    }

    get newCategoryControl(): AbstractControl {
        return this.form.get('newCategory');
    }

    get subcategoryControl(): AbstractControl {
        return this.form.get('subcategory');
    }

    get newSubcategoryControl(): AbstractControl {
        return this.form.get('newSubcategory');
    }

    get valueControl(): AbstractControl {
        return this.form.get('value');
    }

    constructor(private readonly expensesService: ExpensesService,
                private readonly formBuilder: FormBuilder) {
    }


    ngOnInit(): void {
        this.expensesService.getCategoriesWithSubcategories().subscribe(
            (categories: CategoryWithSubcategories[]) => this.categories = categories
        );
        this.form = this.formBuilder.group({
            day: [null, [Validators.required]],
            category: [null, [Validators.required]],
            newCategory: [null, [this.uniqueCategoryValidator]],
            subcategory: [{value: null, disabled: true}, [Validators.required]],
            newSubcategory: [null, []],
            description: [null, []],
            value: [null, [Validators.required, Validators.pattern(TransactionCreateComponent.MONEY_PATTERN)]]
        }, {
            validators: [
                this.uniqueSubcategoryValidator,
                this.newCategoryNotEmptyValidator,
                this.newSubcategoryNotEmptyValidator
            ]
        });
        this.categoryControl.valueChanges.subscribe((value: CategoryWithSubcategories) => {
            this.subcategoryControl.setValue(null);
            if (value) {
                this.subcategoryControl.enable();
            } else {
                this.subcategoryControl.disable();
            }
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }

    onSubmit(): void {

        const category: Category = this.form.value.category === 'new'
            ? {id: null, name: this.form.value.newCategory}
            : {id: this.form.value.category.id, name: this.form.value.category.name};

        const subcategory: Subcategory = this.form.value.subcategory === 'new'
            ? {id: null, name: this.form.value.newSubcategory}
            : {id: this.form.value.subcategory.id, name: this.form.value.subcategory.name};

        this.submit.emit({
            id: null,
            day: this.form.value.day,
            subcategory: {
                ...subcategory,
                category
            },
            description: this.form.value.description,
            value: this.getValueFromForm()
        });
    }

    private getValueFromForm(): number {
        const split: string[] = this.form.value.value.split(/[.,]/);
        return 100 * +`${split[0] || '0'}.${split[1] || '0'}`;
    }

}
