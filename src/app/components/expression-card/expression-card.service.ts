import { Injectable } from '@angular/core';
import { DataType } from 'src/app/models/custom-types.model';
import { Expression } from 'src/app/models/expression.model';

@Injectable({
  providedIn: 'root'
})
export class ExpressionCardService {

  constructor() { }

  generateHint(type: DataType, hint: string | Expression[]): string {
    if (type === 'expression') {
      return hint as string;
    } else {
      const words = (hint as Expression[]).map(expression => expression.word).join(', ');
      return words;
    }
  }
}
