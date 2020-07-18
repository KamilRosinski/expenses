import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DialogReference} from '../../../modal-dialog/model/dialog-reference';
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

    private unavailableMonths: MonthOverview[];

    private readonly uniqueYearMonthValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const year: number = +control.value.year;
        const month: number = +control.value.month;
        return control.value && this.unavailableMonths.some((monthOverview: MonthOverview) =>
            monthOverview.year === year && monthOverview.month === month)
            ? {nonUniqueMonth: {year, month}}
            : null;
    };

    get yearControl(): FormControl {
        return this.form.get('year') as FormControl;
    }

    get monthControl(): FormControl {
        return this.form.get('month') as FormControl;
    }

    constructor(private readonly dialogReference: DialogReference,
                private readonly formBuilder: FormBuilder) {

        this.availableMonths = Array.from(Array(12).keys()).map((i: number) => `${i + 1}`);

        const currentYear = new Date().getFullYear();
        this.availableYears = Array.from(Array(3).keys()).map((i: number) => `${i + currentYear - 1}`);
    }

    ngOnInit() {
        this.unavailableMonths = this.dialogReference.data;
        this.form = this.formBuilder.group({
            month: [null, [Validators.required]],
            year: [null, [Validators.required]]
        }, {
            validators: [this.uniqueYearMonthValidator]
        });
    }

    cancel(): void {
        this.dialogReference.close();
    }

    submit(): void {
        this.dialogReference.close({
            year: +this.form.value.year,
            month: +this.form.value.month
        });
    }

}
