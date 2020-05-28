import {Pipe} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'currencyPln'
})
export class CurrencyPlnPipe extends DecimalPipe {

  transform(value: number): string {
    return `${super.transform(value / 100, '1.2-2')} zł`
        .replace(',', ' ')
        .replace('.', ',');
  }

}
