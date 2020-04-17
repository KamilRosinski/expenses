import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

@Component({
    selector: 'app-create-accounting-period',
    templateUrl: './create-accounting-period.component.html',
    styleUrls: ['./create-accounting-period.component.scss']
})
export class CreateAccountingPeriodComponent {

    apForm: FormGroup = null;

    @Input() otherAccountingPeriodYearMonths: string[];

    @Output() readonly createAccountingPeriod: EventEmitter<string> = new EventEmitter<string>();

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
            year: [now.getFullYear(), [CreateAccountingPeriodComponent.validateYear]],
            month: [now.getMonth() + 1, [CreateAccountingPeriodComponent.validateMonth]]
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
        return (control: FormGroup): ValidationErrors | null => {
            const yearMonth: string = this.otherAccountingPeriodYearMonths.find((yearMonth: string) => {
                let year: number;
                let month: number;
                [year, month] = yearMonth.split('-').map((s: string) => +s);
                return year === +control.value.year && month === +control.value.month;
            });
            return yearMonth ? {alreadyExists: yearMonth} : null;
        }

    }

    hideForm(): void {
        this.apForm = null;
    }

    submit(): void {
        this.createAccountingPeriod.emit(
            `${("0000" + this.apForm.value.year).slice(-4)}-${("00" + this.apForm.value.month).slice(-2)}`
        );
    }

}
