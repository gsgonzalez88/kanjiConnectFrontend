import { emptyExpression } from './../../models/expression.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataType, Difficulty } from './../../models/custom-types.model';
import { Component, OnInit } from '@angular/core';
import { ExpressionsService } from 'src/app/services/expressions.service';
import { Expression, FilterExpressionsDto, UpdateExpressionDto } from 'src/app/models/expression.model';
import { TagsService } from './../../services/tags.service';
import { Tag } from 'src/app/models/tag.model';
import { CardFilter } from 'src/app/models/card-filter.model';
import { CardDifficultyLevel, FetchedDataState } from 'src/app/models/custom-types.model';
import { UserKanji, UserKanjiFilter } from 'src/app/models/user-kanji.model';
import { UserKanjiService } from 'src/app/services/user-kanji.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  public currentReviewData: Expression | UserKanji = emptyExpression;
  public reviewDataList: Expression[] | UserKanji[] = [];
  public total: number = 0;
  public currentIndex: number = 0;
  public tags: Tag[] = [];
  public fetchedDataState: FetchedDataState = 'init';
  public type: DataType = 'expression';
  private user = '61478fb9b2cfde16186509b5';
  private wasFirstSnackShown = false;

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

  getReviewData(json: FilterExpressionsDto | UserKanjiFilter) {
    this.fetchedDataState = 'loading';
    this.currentIndex = 0;
    if (this.type === 'expression') {
      this.expressionsService.filterExpressions(json).subscribe(res => {
        if (res.length > 0) {
          this.reviewDataList = res;
          this.total = this.reviewDataList.length;
          this.currentReviewData = this.reviewDataList[this.currentIndex];
          this.fetchedDataState = 'loaded';
        } else {
          this.fetchedDataState = 'no data';
        }
      }, err => {
        this.fetchedDataState = 'no data';
      })
    } else if (this.type === 'user-kanji') {
      this.userKanjiService.filterUserKanji(json).subscribe(res => {
        if (res.length > 0) {
          this.reviewDataList = res;
          this.total = this.reviewDataList.length;
          this.currentReviewData = this.reviewDataList[this.currentIndex];
          this.fetchedDataState = 'loaded';
        } else {
          this.fetchedDataState = 'no data';
        }
      }, err => {
        this.fetchedDataState = 'no data';
      })
    }
  }

  setFilter(event: CardFilter) {
    if (event.type) {
      this.type = event.type;
      delete event.type;
      this.getReviewData(event);
    }
  }

  setDifficulty(newDifficultyLevel: CardDifficultyLevel) {
    this.updateExpressionDifficulty(newDifficultyLevel);
    if (this.currentIndex < this.total - 1) {
      this.currentIndex += 1;
      this.currentReviewData = this.reviewDataList[this.currentIndex];
    } else {
      console.log('finished')
    }
  }

  updateExpressionDifficulty(newDifficultyLevel: CardDifficultyLevel) {
    const currentDifficulty: Difficulty = this.currentReviewData.difficulty;
    let updatedDifficulty: Difficulty = 0;
    if (newDifficultyLevel === 'easy') {
      updatedDifficulty = currentDifficulty - 2 as Difficulty;
    } else if (newDifficultyLevel === 'hard') {
      updatedDifficulty = currentDifficulty + 1 as Difficulty;
    } else if (newDifficultyLevel === 'OK') {
      updatedDifficulty = currentDifficulty - 1 as Difficulty;
    }

    const updateExpression: UpdateExpressionDto = { difficulty: updatedDifficulty }
    if (this.type === 'expression') {
      this.expressionsService.update(this.currentReviewData._id, updateExpression).subscribe(res => {
        //this.snackBar.open('Difficulty will be updated', 'OK', { duration: 3000 })
      }, err => {
        if (!this.wasFirstSnackShown) {
          this.snackBar.open(`Difficulty won't be updated`, err.error.message, { duration: 3000 })
          this.wasFirstSnackShown = true;
        }
      })
    } else if (this.type === 'user-kanji'){
      console.log('update user kanji')
    }

  }

}
