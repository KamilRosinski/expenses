import {Component, OnInit} from '@angular/core';
import {AccountingPeriodService} from '../../services/accounting-period.service';
import {AccountingPeriodOverview} from '../../shared/accounting-period-overview';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountingPeriod} from '../../shared/accounting-period';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-accounting-period-list',
    templateUrl: './accounting-period-list.component.html',
    styleUrls: ['./accounting-period-list.component.scss']
})
export class AccountingPeriodListComponent implements OnInit {

    createAccountingPeriodForm: FormGroup = null;
    accountingPeriodOverviews: AccountingPeriodOverview[] = [];

    constructor(private readonly accountingPeriodService: AccountingPeriodService,
                private readonly formBuilder: FormBuilder,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.accountingPeriodService.getOverviews().subscribe(
            (accountingPeriodOverviews: AccountingPeriodOverview[]) => this.accountingPeriodOverviews = accountingPeriodOverviews
        );
    }

    showCreateAccountingPeriodForm(): void {
        const now = new Date();
        this.createAccountingPeriodForm = this.formBuilder.group({
            year: [now.getFullYear(), [Validators.required]],
            month: [now.getMonth() + 1, [Validators.required]]
        });
    }

    hideCreateAccountingPeriodForm(): void {
        this.createAccountingPeriodForm = null;
    }

    createAccountingPeriod(): void {
        const year: number = +this.createAccountingPeriodForm.value.year;
        const month: number = +this.createAccountingPeriodForm.value.month;
        this.accountingPeriodService.createForMonth(year, month).pipe(
            map((accountingPeriod: AccountingPeriod) => accountingPeriod.id)
        ).subscribe(
            (id: number) => this.router.navigateByUrl(`expenses/accounting-period/${id}`).then()
        );
    }

}
