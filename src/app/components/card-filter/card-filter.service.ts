import { TagsService } from 'src/app/services/tags.service';
import { Injectable } from '@angular/core';
import { CardFilter } from 'src/app/models/card-filter.model';
import { Tag } from 'src/app/models/tag.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardFilterService {
  private user = '61478fb9b2cfde16186509b5';

  constructor(private tagsService: TagsService) { }

  generateFilter(formValues: any): CardFilter {
    const cardFilter: CardFilter = { user: this.user };
    cardFilter.type = formValues.type;
    if (formValues.lesson !== '') {
      cardFilter.lesson = formValues.lesson;
    }
    const checkedTags: string[] = Object.keys(formValues.tags).filter(key =>
      formValues.tags[key] ? key : null
    );
    if (checkedTags.length > 0) {
      let tags: Tag[] = [];
      this.tagsService.tags$.pipe(take(1)).subscribe(res => tags = res)
      const tagIds: string[] = checkedTags.map(checkedTag => {
        const tagObject = tags.find(tag => tag.name === checkedTag);
        return tagObject ? tagObject._id : '';
      })
      cardFilter.tags = tagIds;
    }
    if (formValues.jlpt) {
      cardFilter.jlpt = formValues.jlpt;
    }
    /*if (formValues.type === 'expression' && formValues.transitivity) {
      cardFilter.transitivity = formValues.transitivity;
    }*/
    /*if (formValues.difficulty) {
      cardFilter.difficulty = formValues.difficulty;
    }*/
    return cardFilter;
  }
}
