import { CardFlipState, DataType } from './../../models/custom-types.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Expression, ExpressionInitializer } from 'src/app/models/expression.model';
import { CardDifficultyLevel, FetchedDataState } from 'src/app/models/custom-types.model';
import { emptyUserKanji, UserKanji } from 'src/app/models/user-kanji.model';

@Component({
  selector: 'app-expression-card',
  templateUrl: './expression-card.component.html',
  styleUrls: ['./expression-card.component.scss']
})
export class ExpressionCardComponent implements OnInit, OnChanges {
  @Input() expression: Expression = new ExpressionInitializer();
  @Input() fetchedDataState: FetchedDataState = 'init';
  @Input() userKanji: UserKanji = emptyUserKanji;
  @Input() type: DataType = 'expression';
  @Output() difficulty = new EventEmitter();

  public cardFlipState: CardFlipState = 'front';
  public showHint: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expression) {
      this.cardFlipState = 'front';
      this.showHint = false;
    }
  }

  sendDifficulty(newDifficultyLevel: CardDifficultyLevel) {
    this.difficulty.emit(newDifficultyLevel);
  }

}
