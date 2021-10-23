import { CardFlipState, DataType } from './../../models/custom-types.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { emptyExpression, Expression } from 'src/app/models/expression.model';
import { CardDifficultyLevel, FetchedDataState } from 'src/app/models/custom-types.model';
import { UserKanji } from 'src/app/models/user-kanji.model';
import { ExpressionCardService } from './expression-card.service';
import { emptyExpressionCard, ExpressionCard, UserKanjiCard } from 'src/app/models/card.model';

@Component({
  selector: 'app-expression-card',
  templateUrl: './expression-card.component.html',
  styleUrls: ['./expression-card.component.scss']
})
export class ExpressionCardComponent implements OnInit, OnChanges {
  @Input() reviewData: Expression | UserKanji = emptyExpression;
  @Input() fetchedDataState: FetchedDataState = 'init';
  @Input() type: DataType = 'expression';
  @Output() difficulty = new EventEmitter();

  public cardFlipState: CardFlipState = 'front';
  public showHint: boolean = false;
  public cardData: ExpressionCard | UserKanjiCard = emptyExpressionCard;

  constructor(private expressionCardService: ExpressionCardService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reviewData) {
      this.cardData = this.expressionCardService.generateCardData(this.type, this.reviewData);
      this.cardFlipState = 'front';
      this.showHint = false;
    }
  }

  sendDifficulty(newDifficultyLevel: CardDifficultyLevel) {
    this.difficulty.emit(newDifficultyLevel);
  }
}
