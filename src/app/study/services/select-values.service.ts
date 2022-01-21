import { Jlpt, Transitivity, DataType, DifficultyText, Difficulty } from '../../shared/models/custom-types.model';
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
    return this.getDataType()[0].value;
  }

  getDifficulty(): { name: DifficultyText | '', value: Difficulty[] | null}[] {
    return [
      { name: '', value: null },
      { name: 'Very hard', value: [10, 9] },
      { name: 'Hard', value: [8, 7] },
      { name: 'Medium', value: [6, 5, 4] },
      { name: 'Easy', value: [3, 2] },
      { name: 'Very easy', value: [1, 0] },
    ]
  }
}
