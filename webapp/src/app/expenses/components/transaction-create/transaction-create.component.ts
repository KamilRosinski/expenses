import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExpensesService} from '../../services/expenses.service';
import {Observable} from 'rxjs';
import {CategoryWithSubcategories} from '../../shared/category-with-subcategories';

@Component({
    selector: 'app-transaction-create',
    templateUrl: './transaction-create.component.html',
    styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {

    categories$: Observable<CategoryWithSubcategories[]>;

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    constructor(private readonly expensesService: ExpensesService) {
    }

    onCancel(): void {
        this.cancel.emit();
    }

    ngOnInit(): void {
        this.categories$ = this.expensesService.getCategoriesWithSubcategories();
    }

}
