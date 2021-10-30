import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardDifficultyLevel, Difficulty } from 'src/app/models/custom-types.model';

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
    let newDifficulty: Difficulty | null = null;
    if (cardDifficulty === 'easy' && this.difficulty !== null && this.difficulty > 1) {
      newDifficulty = this.difficulty === 1
       ? 0
       : this.difficulty - 2 as Difficulty;
    } else if (cardDifficulty === 'OK' && this.difficulty !== null && this.difficulty > 0) {
      newDifficulty = this.difficulty - 1 as Difficulty;
    } else if (cardDifficulty === 'hard' && this.difficulty !== null && this.difficulty < 10) {
      newDifficulty = this.difficulty + 1 as Difficulty;
    }

    if (newDifficulty !== null) {
      this.updatedDifficulty.emit(newDifficulty);
    } else {
      this.snackBar.open('Invalid difficulty', 'Error', { duration: 3000 });
    }
  }

}
