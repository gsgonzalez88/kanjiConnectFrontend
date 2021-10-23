import { Pipe, PipeTransform } from '@angular/core';
import { ExpressionCard, UserKanjiCard } from '../models/card.model';

@Pipe({
  name: 'expressionCast'
})
export class ExpressionCastPipe implements PipeTransform {

  transform(value: ExpressionCard | UserKanjiCard): ExpressionCard {
    return value as ExpressionCard;
  }

}
