import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Observable} from 'rxjs';
import {CategoryWithSubcategories} from '../../shared/category-with-subcategories';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-transaction-create',
    templateUrl: './transaction-create.component.html',
    styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {

    form: FormGroup;
    categories$: Observable<CategoryWithSubcategories[]>;

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    get categoryInput(): AbstractControl {
        return this.form.get('category');
    }

    constructor(private readonly expensesService: ExpensesService,
                private readonly formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.categories$ = this.expensesService.getCategoriesWithSubcategories();
        this.form = this.formBuilder.group({
            category: ['', [Validators.required]]
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }

    onSubmit(): void {
        console.log(this.form.value);
    }

}
