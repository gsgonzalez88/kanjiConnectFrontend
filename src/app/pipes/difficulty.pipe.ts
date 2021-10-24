import { Pipe, PipeTransform } from '@angular/core';
import { Difficulty, DifficultyText } from '../models/custom-types.model';

@Pipe({
  name: 'difficulty'
})
export class DifficultyPipe implements PipeTransform {

  transform(difficulty: Difficulty): DifficultyText | null {
    if (difficulty > 8) {
      return 'Very hard';
    } else if (difficulty === 7 || difficulty === 8) {
      return 'Hard';
    } else if (difficulty > 3 && difficulty < 7) {
      return 'Medium';
    } else if (difficulty == 3 || difficulty == 2) {
      return 'Easy';
    } else if (difficulty < 2) {
      return 'Very easy';
    } else {
      return null;
    }
  }

}
