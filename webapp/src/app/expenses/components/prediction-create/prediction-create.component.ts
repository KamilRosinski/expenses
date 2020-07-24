import {Component, OnInit} from '@angular/core';
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
import {MoneyUtils} from '../../utils/money.utils';
import {DialogReference} from '../../../modal-dialog/model/dialog-reference';
import {map} from 'rxjs/operators';
import {NotificationsService} from '../../../notifications/services/notifications.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    templateUrl: './prediction-create.component.html',
    styleUrls: ['./prediction-create.component.scss']
})
export class PredictionCreateComponent implements OnInit {

    form: FormGroup;
    categories: Category[];

    private readonly uniqueCategoryValidator: ValidatorFn = (control: FormControl): ValidationErrors | null =>
        control.value && this.categories.some((category: Category) => category.name === control.value)
            ? {nonUniqueCategory: control.value}
            : null;

    private readonly newCategoryNotEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
        control.value.category === 'new' && !control.value.newCategory
            ? {emptyNewCategory: true}
            : null;

    get categoryControl(): AbstractControl {
        return this.form.get('category');
    }

    get newCategoryControl(): AbstractControl {
        return this.form.get('newCategory');
    }

    get valueControl(): AbstractControl {
        return this.form.get('value');
    }

    constructor(private readonly dialogReference: DialogReference,
                private readonly expensesService: ExpensesService,
                private readonly formBuilder: FormBuilder,
                private readonly notificationsService: NotificationsService) {
    }

    ngOnInit(): void {
        this.expensesService.getCategories().pipe(
            map((categories: Category[]) => {
                const unavailableCategoryIds: number[] = this.dialogReference.data;
                return categories.filter((category: Category) => !unavailableCategoryIds.includes(category.id));
            })
        ).subscribe({
            next: (categories: Category[]) => this.categories = categories,
            error: (error: HttpErrorResponse) => this.notificationsService.show(`Failed to load categories. Following error occurred: ${error.message}.`)
        });
        this.form = this.formBuilder.group({
            category: [null, [Validators.required]],
            newCategory: [null, [this.uniqueCategoryValidator]],
            value: [null, [Validators.required, Validators.pattern(MoneyUtils.MONEY_PATTERN)]]
        }, {
            validators: [this.newCategoryNotEmptyValidator]
        });
    }

    cancel(): void {
        this.dialogReference.close();
    }

    submit(): void {

        const category: Category = this.form.value.category === 'new'
            ? {id: null, name: this.form.value.newCategory}
            : this.form.value.category;

        const prediction: Prediction = {
            id: null,
            category,
            value: MoneyUtils.convertMoneyToInt(this.form.value.value)
        }

        this.dialogReference.close(prediction);
    }

}
