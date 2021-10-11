import { Component, OnInit } from '@angular/core';
import { ExpressionsService } from 'src/app/services/expressions.service';
import { Expression, ExpressionInitializer, FilterExpressionsDto, UpdateExpressionDto } from 'src/app/models/expression.model';
import { LessonsService } from 'src/app/services/lessons.service';
import { TagsService } from './../../services/tags.service';
import { Tag } from 'src/app/models/tag.model';
import { Lesson } from 'src/app/models/lesson.model';
import { CardFilter } from 'src/app/models/card-filter.model';
import { CardDifficultyLevel, FetchedDataState } from 'src/app/models/custom-types.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  public expressions: Expression[] = [];
  public currentExpression: Expression = new ExpressionInitializer();
  public total: number = 0;
  public currentIndex: number = 0;
  public tags: Tag[] = [];
  public lessons: Lesson[] = [];
  public fetchedDataState: FetchedDataState = 'init';
  private user = '61478fb9b2cfde16186509b5';

  constructor(private expressionsService: ExpressionsService,
              private tagsService: TagsService,
              private lessonsService: LessonsService) { }

  ngOnInit(): void {
    this.getTags();
    this.getLessons();
  }

  getTags() {
    this.tagsService.getTagsByUser(this.user).subscribe(
      res => this.tags = res
    )
  }

  getLessons() {
    this.lessonsService.getLessonsByUser(this.user).subscribe(
      res => this.lessons = res
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
    if (event.type === 'expressions') {
      delete event.type;
      this.getExpressions(event)
    }

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
    const currentDifficulty: number = this.currentExpression.difficulty;
    let updatedDifficulty: number | null = null;
    if (newDifficultyLevel === 'easy') {
      updatedDifficulty = currentDifficulty - 1;
    } else if (newDifficultyLevel === 'hard') {
      updatedDifficulty = currentDifficulty + 1;
    }
    if (updatedDifficulty) {
      const updateExpression: UpdateExpressionDto = { difficulty: updatedDifficulty }
      this.expressionsService.update(this.currentExpression._id, updateExpression).subscribe(res => {
        console.log('difficulty updated')
      })
    }
  }

}
