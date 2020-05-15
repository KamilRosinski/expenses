import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Prediction} from '../../shared/prediction';
import {ExpensesService} from '../../services/expenses.service';
import {Observable} from 'rxjs';
import {Category} from '../../shared/category';
import {ExpensesValidators} from '../../validators/expenses.validators';

@Component({
    selector: 'app-prediction-create',
    templateUrl: './prediction-create.component.html',
    styleUrls: ['./prediction-create.component.scss']
})
export class PredictionCreateComponent implements OnInit {

    form: FormGroup;
    categories$: Observable<Category[]>;

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<Prediction> = new EventEmitter<Prediction>();

    constructor(private readonly expensesService: ExpensesService,
                private readonly formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.categories$ = this.expensesService.getCategories();
        this.form = this.formBuilder.group({
            category: ['', [Validators.required]],
            value: ['', [Validators.required, ExpensesValidators.moneyInput()]]
        });
    }

    onCancel(): void {
      this.cancel.emit();
    }

    onSubmit(): void {
        this.submit.emit();
    }

}
