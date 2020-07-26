import {Pipe, PipeTransform} from '@angular/core';
import {Prediction} from '../model/prediction';

@Pipe({
  name: 'predictionsSort'
})
export class PredictionsSortPipe implements PipeTransform {

  transform(predictions: Prediction[]): Prediction[] {
    return [...predictions].sort(
        (p1: Prediction, p2: Prediction) => p1.category.name > p2.category.name ? 1 : -1
    );
  }

}
