import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-transaction-create',
    templateUrl: './transaction-create.component.html',
    styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent {

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    onCancel(): void {
        this.cancel.emit();
    }

}
