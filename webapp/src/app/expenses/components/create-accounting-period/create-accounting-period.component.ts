import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {YearMonth} from '../../shared/year-month';

@Component({
    selector: 'app-create-accounting-period',
    templateUrl: './create-accounting-period.component.html',
    styleUrls: ['./create-accounting-period.component.scss']
})
export class CreateAccountingPeriodComponent {

    apForm: FormGroup = null;

    @Input() otherAccountingPeriodYearMonths: YearMonth[];

    @Output() readonly createAccountingPeriod: EventEmitter<YearMonth> = new EventEmitter<YearMonth>();

    get year(): AbstractControl {
        return this.apForm.get('year');
    }

    get month(): AbstractControl {
        return this.apForm.get('month');
    }

    constructor(private readonly formBuilder: FormBuilder) {
    }

    showForm(): void {
        const now = new Date();
        this.apForm = this.formBuilder.group({
            year: [now.getFullYear(), [Validators.required, CreateAccountingPeriodComponent.validateYear]],
            month: [now.getMonth() + 1, [Validators.required, CreateAccountingPeriodComponent.validateMonth]]
        }, {
            validators: this.createYearMonthValidator()
        });
    }

    private static validateYear(control: AbstractControl): ValidationErrors | null {
        const year: number = +control.value;
        return year > 0 && Number.isInteger(year) ? null : {invalidYear: true};
    }

    private static validateMonth(control: AbstractControl): ValidationErrors | null {
        const month: number = +control.value;
        return month >= 1 && month <= 12 && Number.isInteger(month) ? null : {invalidMonth: true};
    }

    private createYearMonthValidator(): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null =>
            this.otherAccountingPeriodYearMonths.some((yearMonth: YearMonth) =>
                yearMonth.year === +control.value.year && yearMonth.month === +control.value.month
            ) ? {alreadyExists: true} : null;

    }

    hideForm(): void {
        this.apForm = null;
    }

    submit(): void {
        this.createAccountingPeriod.emit({
            year: +this.apForm.value.year,
            month: +this.apForm.value.month
        });
    }

}
