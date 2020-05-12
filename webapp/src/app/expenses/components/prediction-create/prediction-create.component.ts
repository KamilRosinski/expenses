import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Prediction} from '../../shared/prediction';

@Component({
    selector: 'app-prediction-create',
    templateUrl: './prediction-create.component.html',
    styleUrls: ['./prediction-create.component.scss']
})
export class PredictionCreateComponent implements OnInit {

    form: FormGroup;

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<Prediction> = new EventEmitter<Prediction>();

    constructor(private readonly formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
        });
    }

    onCancel(): void {
      this.cancel.emit();
    }

    onSubmit(): void {
        this.submit.emit();
    }

}
