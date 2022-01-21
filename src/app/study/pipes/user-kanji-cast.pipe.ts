import { Pipe, PipeTransform } from '@angular/core';
import { ExpressionCard, UserKanjiCard } from '../models/card.model';

@Pipe({
  name: 'userKanjiCast'
})
export class UserKanjiCastPipe implements PipeTransform {

  transform(value: ExpressionCard | UserKanjiCard): UserKanjiCard {
    return value as UserKanjiCard;
  }

}
