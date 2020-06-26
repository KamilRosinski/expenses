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
import {Router} from '@angular/router';
import {ExpensesService} from '../../services/expenses.service';
import {Month} from '../../shared/month';

@Component({
    selector: 'app-month-create',
    templateUrl: './month-create.component.html',
    styleUrls: ['./month-create.component.scss']
})
export class MonthCreateComponent implements OnInit {

    form: FormGroup;
    availableMonths: string[];
    availableYears: string[];

    private readonly uniqueYearMonthValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const year: number = +control.value.year;
        const month: number = +control.value.month;
        return control.value && this.unavailableMonths.some((yearMonth: { year: number, month: number }) =>
            yearMonth.year === year && yearMonth.month === month)
            ? {nonUniqueCategory: {year, month}}
            : null;
    };

    @Input() unavailableMonths: { year: number, month: number }[];

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    get yearControl(): FormControl {
        return this.form.get('year') as FormControl;
    }

    get monthControl(): FormControl {
        return this.form.get('month') as FormControl;
    }

    constructor(private readonly formBuilder: FormBuilder,
                private readonly expensesService: ExpensesService,
                private readonly router: Router) {

        this.availableMonths = Array.from(Array(12).keys()).map((i: number) => `${i + 1}`);

        const currentYear = new Date().getFullYear();
        this.availableYears = Array.from(Array(3).keys()).map((i: number) => `${i + currentYear - 1}`);
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            month: [null, [Validators.required]],
            year: [null, [Validators.required]]
        }, {
            validators: [this.uniqueYearMonthValidator]
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }

    onSubmit(): void {
        const year: number = +this.form.value.year;
        const month: number = +this.form.value.month;
        this.expensesService.createMonth(year, month).subscribe((month: Month) => {
            this.router.navigate(['expenses', 'month', month.id], {
                queryParams: {
                    tab: 'transactions'
                }
            }).then();
        });
    }

}
