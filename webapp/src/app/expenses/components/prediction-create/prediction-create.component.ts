import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {Prediction} from '../../shared/prediction';
import {ExpensesService} from '../../services/expenses.service';
import {Category} from '../../shared/category';

@Component({
    selector: 'app-prediction-create',
    templateUrl: './prediction-create.component.html',
    styleUrls: ['./prediction-create.component.scss']
})
export class PredictionCreateComponent implements OnInit {

    private static readonly MONEY_PATTERN: RegExp = /^[+-]?([0-9]*)[,.]?([0-9]{0,2})$/;

    form: FormGroup;
    categories: Category[];

    private readonly uniquePredictionCategoryValidator: ValidatorFn = (control: FormControl): ValidationErrors | null =>
        control.value && this.unavailableCategoryIds.includes(control.value.id)
            ? {nonUnique: control.value}
            : null;

    private readonly uniqueCategoryNameValidator: ValidatorFn = (control: FormControl): ValidationErrors | null =>
        control.value && this.categories.some((category: Category) => category.name === control.value)
            ? {nonUnique: control.value}
            : null;

    private readonly newCategoryNotEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
        control.value.category === 'new' && !control.value.newCategory
            ? {emptyCategory: true}
            : null;

    @Input() unavailableCategoryIds: number[];

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<Prediction> = new EventEmitter<Prediction>();

    get categoryControl(): AbstractControl {
        return this.form.get('category');
    }

    get newCategoryControl(): AbstractControl {
        return this.form.get('newCategory');
    }

    get valueControl(): AbstractControl {
        return this.form.get('value');
    }

    constructor(private readonly expensesService: ExpensesService,
                private readonly formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.expensesService.getCategories().subscribe(
            (categories: Category[]) => this.categories = categories
        );
        this.form = this.formBuilder.group({
            category: [null, [Validators.required, this.uniquePredictionCategoryValidator]],
            newCategory: [null, [this.uniqueCategoryNameValidator]],
            value: [null, [Validators.required, Validators.pattern(PredictionCreateComponent.MONEY_PATTERN)]]
        }, {
            validators: [this.newCategoryNotEmptyValidator]
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }

    onSubmit(): void {
        this.submit.emit({
            id: null,
            category: this.form.value.category === 'new'
                ? {id: null, name: this.form.value.newCategory}
                : this.form.value.category,
            value: this.getValueFromForm()
        });
    }

    private getValueFromForm(): number {
        const match: RegExpMatchArray = this.form.value.value.match(PredictionCreateComponent.MONEY_PATTERN);
        return 100 * (match[1] ? +match[1] : 0) + (match[2] ? +match[2] : 0);
    }

}
