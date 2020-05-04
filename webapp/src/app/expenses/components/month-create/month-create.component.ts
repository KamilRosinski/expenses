import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ExpensesService} from '../../services/expenses.service';
import {Month} from '../../shared/month';
import {MonthOverview} from '../../shared/month-overview';

@Component({
    selector: 'app-month-create',
    templateUrl: './month-create.component.html',
    styleUrls: ['./month-create.component.scss']
})
export class MonthCreateComponent implements OnInit {

    form: FormGroup;
    availableMonths: string[];
    availableYears: string[];
    existingMonths: number[];

    @Input() set months(months: MonthOverview[]) {
        this.existingMonths = months.map((month: MonthOverview) => this.yearMonthToNumber(month.year, month.month));
    }

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    get yearControl(): AbstractControl {
        return this.form.get('year');
    }

    get monthControl(): AbstractControl {
        return this.form.get('month');
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
            month: ['', [Validators.required]],
            year: ['', [Validators.required]]
        }, {
            validators: [this.createYearMonthValidator()]
        });
    }

    private createYearMonthValidator(): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            const year: number = +control.value.year;
            const month: number = +control.value.month;
            return this.existingMonths.includes(this.yearMonthToNumber(year, month))
                ? {nonUnique: {year, month}}
                : null;
        };
    }

    private yearMonthToNumber(year: number, month: number): number {
        return 12 * year + month;
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
