import { CardFlipState, DataType, Difficulty } from '../../models/custom-types.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { emptyExpression, Expression } from 'src/app/models/expression.model';
import { FetchedDataState } from 'src/app/models/custom-types.model';
import { UserKanji } from 'src/app/models/user-kanji.model';
import { ExpressionCardService } from './review-card.service';
import { emptyExpressionCard, ExpressionCard, UserKanjiCard } from 'src/app/models/card.model';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
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

  sendUpdatedDifficulty(updatedDifficulty: Difficulty) {
    this.difficulty.emit(updatedDifficulty);
  }
}
