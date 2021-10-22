import { Jlpt, Transitivity, DataType } from './../models/custom-types.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectValuesService {

  constructor() { }

  getJlpt(): { name: number | '', value: Jlpt}[] {
    return [
      { name: '', value: null },
      { name: 5, value: 5 },
      { name: 4, value: 4 },
      { name: 3, value: 3 },
      { name: 2, value: 2 },
      { name: 1, value: 1 }
    ]
  }

  getTransitivity(): { name: string, value: Transitivity}[] {
    return [
      { name: '', value: null },
      { name: 'Transitive', value: 'transitive' },
      { name: 'Intransitive', value: 'intransitive' },
    ]
  }

  getDataType(): { name: string, value: DataType }[] {
    return [
      { name: 'Expressions', value: 'expression' },
      { name: 'Kanjis', value: 'user-kanji' },
    ]
  }

  getDefaultDataTypeValue(): DataType {
    return this.getDataType()[1].value;
  }
}
