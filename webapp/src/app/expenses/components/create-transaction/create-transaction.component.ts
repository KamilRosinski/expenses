import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction} from '../../shared/transaction';
import {AccountingPeriodService} from '../../services/accounting-period.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {TransactionCategory} from '../../shared/transaction-category';

@Component({
    selector: 'app-create-transaction',
    templateUrl: './create-transaction.component.html',
    styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

    form: FormGroup;
    days: number[];
    categories: TransactionCategory[] = [];

    @Input() accountingPeriodLength: number;

    @Output() transactionCreated: EventEmitter<Transaction> = new EventEmitter<Transaction>();
    @Output() cancelled: EventEmitter<void> = new EventEmitter<void>();

    get category(): AbstractControl {
        return this.form.get('category');
    }

    constructor(private readonly accountingPeriodService: AccountingPeriodService,
                private readonly formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.days = Array.from(Array(this.accountingPeriodLength).keys()).map((day: number) => day + 1);
        this.accountingPeriodService.getTransactionCategories().subscribe(
            (categories: TransactionCategory[]) => this.categories = categories
        );
        this.form = this.formBuilder.group({
            day: ['', [Validators.required]],
            category: ['', [Validators.required]],
            newCategory: [''],
            description: [''],
            value: ['', [Validators.required]]
        }, {
            validators: [this.createCategoryValidator()]
        });
    }

    private createCategoryValidator(): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            let result: ValidationErrors = null;
            if (control.value.category === 'new') {
                if (!control.value.newCategory) {
                    result = {categoryNameEmpty: true};
                } else if (this.categories.map((c: TransactionCategory) => c.name).includes(control.value.newCategory)) {
                    result = {categoryAlreadyExists: control.value.newCategory};
                }
            }
            return result;
        }

    }

    cancel(): void {
        this.cancelled.emit();
    }

    submit(): void {
        this.transactionCreated.emit({
            id: null,
            day: this.form.value.day,
            description: this.form.value.description,
            value: this.form.value.value,
            category: this.form.value.category !== 'new'
                ? this.form.value.category
                : {id: null, name: this.form.value.newCategory}
        });
    }

}
