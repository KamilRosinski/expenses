import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Prediction} from '../../shared/prediction';
import {ExpensesService} from '../../services/expenses.service';
import {Observable} from 'rxjs';
import {Category} from '../../shared/category';

@Component({
    selector: 'app-prediction-create',
    templateUrl: './prediction-create.component.html',
    styleUrls: ['./prediction-create.component.scss']
})
export class PredictionCreateComponent implements OnInit {

    private static readonly MONEY_PATTERN: RegExp = /^[+-]?([0-9]*)[,.]?([0-9]{0,2})$/;

    form: FormGroup;
    categories$: Observable<Category[]>;

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<Prediction> = new EventEmitter<Prediction>();

    get categoryControl(): AbstractControl {
        return this.form.get('category');
    }

    get valueControl(): AbstractControl {
        return this.form.get('value');
    }

    constructor(private readonly expensesService: ExpensesService,
                private readonly formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.categories$ = this.expensesService.getCategories();
        this.form = this.formBuilder.group({
            category: [null, [Validators.required]],
            value: [null, [Validators.required, Validators.pattern(PredictionCreateComponent.MONEY_PATTERN)]]
        });
    }

    onCancel(): void {
      this.cancel.emit();
    }

    onSubmit(): void {
        this.submit.emit({
            id: null,
            category: this.form.value.category,
            value: this.getValueFromForm()
        });
    }

    private getValueFromForm(): number {
        const match: RegExpMatchArray = this.form.value.value.match(PredictionCreateComponent.MONEY_PATTERN);
        return 100 * (match[1] ? +match[1] : 0) + (match[2] ? +match[2] : 0);
    }

}
