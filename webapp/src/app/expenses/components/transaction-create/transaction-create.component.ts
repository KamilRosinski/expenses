import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Observable} from 'rxjs';
import {CategoryWithSubcategories} from '../../shared/category-with-subcategories';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Transaction} from '../../shared/transaction';
import {ExpensesValidators} from '../../validators/expenses.validators';

@Component({
    selector: 'app-transaction-create',
    templateUrl: './transaction-create.component.html',
    styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {

    private static readonly MONEY_PATTERN: RegExp = /^[+-]?([0-9]*)[,.]?([0-9]{0,2})$/;

    form: FormGroup;
    categories$: Observable<CategoryWithSubcategories[]>;

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

    get subcategoryControl(): AbstractControl {
        return this.form.get('subcategory');
    }

    get valueControl(): AbstractControl {
        return this.form.get('value');
    }

    constructor(private readonly expensesService: ExpensesService,
                private readonly formBuilder: FormBuilder) {
    }


    ngOnInit(): void {
        this.categories$ = this.expensesService.getCategoriesWithSubcategories();
        this.form = this.formBuilder.group({
            day: [null, [Validators.required]],
            category: [null, [Validators.required]],
            subcategory: [null, [Validators.required]],
            description: [null, []],
            value: [null, [Validators.pattern(TransactionCreateComponent.MONEY_PATTERN)]]
        });
        this.subcategoryControl.disable();
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
        this.submit.emit({
            id: null,
            day: this.form.value.day,
            subcategory: {
                id: this.form.value.subcategory.id,
                name: this.form.value.subcategory.name,
                category: {
                    id: this.form.value.category.id,
                    name: this.form.value.category.name
                }
            },
            description: this.form.value.description,
            value: this.getValueFromForm()
        });
    }

    private getValueFromForm(): number {
        const match: RegExpMatchArray = this.form.value.value.match(TransactionCreateComponent.MONEY_PATTERN);
        return 100 * (match[1] ? + match[1] : 0) + (match[2] ? +match[2] : 0);
    }

}
