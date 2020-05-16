import {ValidatorFn, Validators} from '@angular/forms';

export class ExpensesValidators {

    static readonly moneyInput: ValidatorFn = Validators.pattern(/^[+-]?[0-9]+([.,][0-9]{1,2})?$/);

}
