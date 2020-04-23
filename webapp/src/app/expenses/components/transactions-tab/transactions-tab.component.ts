import {Component, Input} from '@angular/core';
import {Month} from '../../shared/month';

@Component({
    selector: 'app-transactions-tab',
    templateUrl: './transactions-tab.component.html',
    styleUrls: ['./transactions-tab.component.scss']
})
export class TransactionsTabComponent {

    @Input() month: Month;

}
