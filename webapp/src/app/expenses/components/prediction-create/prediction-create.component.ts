import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-prediction-create',
    templateUrl: './prediction-create.component.html',
    styleUrls: ['./prediction-create.component.scss']
})
export class PredictionCreateComponent implements OnInit {

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onCancel(): void {
      this.cancel.emit();
    }

}
