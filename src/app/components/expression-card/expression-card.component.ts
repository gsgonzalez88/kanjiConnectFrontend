import { CardFlipState, DataType } from './../../models/custom-types.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Expression, ExpressionInitializer } from 'src/app/models/expression.model';
import { CardDifficultyLevel, FetchedDataState } from 'src/app/models/custom-types.model';
import { emptyUserKanji, UserKanji } from 'src/app/models/user-kanji.model';
import { ExpressionCardService } from './expression-card.service';

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
  public hint: string = '';

  constructor(private expressionCardService: ExpressionCardService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes.expression) {
      this.cardFlipState = 'front';
      this.hint = this.expressionCardService.generateHint('expression', this.expression.exampleSentences[0].sentence);
      this.showHint = false;
    } else if (changes.userKanji) {
      console.log(this.userKanji)
      this.cardFlipState = 'front';
      this.hint = this.expressionCardService.generateHint('user-kanji', this.userKanji.expressions);
      this.showHint = false;
    }
  }

  sendDifficulty(newDifficultyLevel: CardDifficultyLevel) {
    this.difficulty.emit(newDifficultyLevel);
  }

}
