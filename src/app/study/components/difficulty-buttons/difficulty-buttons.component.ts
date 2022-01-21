import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardDifficultyLevel, Difficulty } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-difficulty-buttons',
  templateUrl: './difficulty-buttons.component.html',
  styleUrls: ['./difficulty-buttons.component.scss']
})
export class DifficultyButtonsComponent implements OnInit {
  @Input() difficulty: Difficulty | null = null;
  @Output() updatedDifficulty = new EventEmitter<Difficulty>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateDifficulty(cardDifficulty: CardDifficultyLevel) {
    let newRawDifficulty: number | null = null;
    if (cardDifficulty === 'easy' && this.difficulty !== null) {
      newRawDifficulty =  this.difficulty - 2;
    } else if (cardDifficulty === 'OK' && this.difficulty !== null) {
      newRawDifficulty = this.difficulty - 1;
    } else if (cardDifficulty === 'hard' && this.difficulty !== null) {
      newRawDifficulty = this.difficulty + 1;
    }

    let newCastDifficulty: Difficulty | null = null;
    if (newRawDifficulty !== null && newRawDifficulty >= 0 && newRawDifficulty <= 10) {
      newCastDifficulty = newRawDifficulty as Difficulty;
    } else if (newRawDifficulty !== null && newRawDifficulty < 0) {
      newCastDifficulty = 0;
    } else if (newRawDifficulty !== null && newRawDifficulty > 10) {
      newCastDifficulty = 10;
    }

    if (newCastDifficulty !== null) {
      this.updatedDifficulty.emit(newCastDifficulty);
    } else {
      this.snackBar.open('Invalid difficulty', 'Error', { duration: 3000 });
    }
  }

}
