import { MatSnackBar } from '@angular/material/snack-bar';
import { DataType, Difficulty } from './../../models/custom-types.model';
import { Component, OnInit } from '@angular/core';
import { ExpressionsService } from 'src/app/services/expressions.service';
import { Expression, ExpressionInitializer, FilterExpressionsDto, UpdateExpressionDto } from 'src/app/models/expression.model';
import { TagsService } from './../../services/tags.service';
import { Tag } from 'src/app/models/tag.model';
import { Lesson } from 'src/app/models/lesson.model';
import { CardFilter } from 'src/app/models/card-filter.model';
import { CardDifficultyLevel, FetchedDataState } from 'src/app/models/custom-types.model';
import { emptyUserKanji, UserKanji, UserKanjiFilter } from 'src/app/models/user-kanji.model';
import { UserKanjiService } from 'src/app/services/user-kanji.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  public expressions: Expression[] = [];
  public currentExpression: Expression = new ExpressionInitializer();
  public userKanjis: UserKanji[] = [];
  public currentUserKanji: UserKanji = emptyUserKanji;
  public total: number = 0;
  public currentIndex: number = 0;
  public tags: Tag[] = [];
  public lessons: Lesson[] = [];
  public fetchedDataState: FetchedDataState = 'init';
  public type: DataType = 'expression';
  private user = '61478fb9b2cfde16186509b5';

  constructor(private expressionsService: ExpressionsService,
              private userKanjiService: UserKanjiService,
              private tagsService: TagsService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.tagsService.getTagsByUser(this.user).subscribe(
      res => this.tags = res
    )
  }

  getExpressions(json: FilterExpressionsDto) {
    this.fetchedDataState = 'loading';
    this.currentIndex = 0;
    this.expressionsService.filterExpressions(json).subscribe(res => {
      if (res.length > 0) {
        this.expressions = res;
        this.total = this.expressions.length;
        this.currentExpression = this.expressions[this.currentIndex];
        this.fetchedDataState = 'loaded';
      } else {
        this.fetchedDataState = 'no data';
      }
    }, err => {
      this.fetchedDataState = 'no data';
    })
  }

  setFilter(event: CardFilter) {
    if (event.type === 'expression') {
      delete event.type;
      this.type = 'expression';
      this.getExpressions(event)
    } else if (event.type === 'user-kanji') {
      delete event.type;
      this.type = 'user-kanji';
      this.getUserKanji(event);
    }
  }

  getUserKanji(json: UserKanjiFilter) {
    this.fetchedDataState = 'loading';
    this.currentIndex = 0;
    this.userKanjiService.filterUserKanji(json).subscribe(res => {
      if (res.length > 0) {
        console.log(res)
        this.userKanjis = res;
        this.total = this.userKanjis.length;
        this.currentUserKanji = this.userKanjis[this.currentIndex];
        this.fetchedDataState = 'loaded';
      } else {
        this.fetchedDataState = 'no data';
      }
    }, err => {
      this.fetchedDataState = 'no data';
    })
  }

  setDifficulty(newDifficultyLevel: CardDifficultyLevel) {
    this.updateExpressionDifficulty(newDifficultyLevel);
    if (this.currentIndex < this.total - 1) {
      this.currentIndex += 1;
      this.currentExpression = this.expressions[this.currentIndex];
    } else {
      console.log('finished')
    }
  }

  updateExpressionDifficulty(newDifficultyLevel: CardDifficultyLevel) {
    const currentDifficulty: Difficulty = this.currentExpression.difficulty;
    let updatedDifficulty: Difficulty = 0;
    if (newDifficultyLevel === 'easy') {
      updatedDifficulty = currentDifficulty - 2 as Difficulty;
    } else if (newDifficultyLevel === 'hard') {
      updatedDifficulty = currentDifficulty + 1 as Difficulty;
    } else if (newDifficultyLevel === 'OK') {
      updatedDifficulty = currentDifficulty - 1 as Difficulty;
    }
    const updateExpression: UpdateExpressionDto = { difficulty: updatedDifficulty }
    this.expressionsService.update(this.currentExpression._id, updateExpression).subscribe(res => {
      //this.snackBar.open('Difficulty updaded', 'OK', { duration: 3000 })
    }, err => {
      this.snackBar.open('Difficulty not updated', err.error.message, { duration: 3000 })
    })
  }

}
