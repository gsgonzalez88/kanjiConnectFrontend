import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { Lesson } from 'src/app/models/lesson.model';
import { CardFilter } from 'src/app/models/card-filter.model';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class CardFilterComponent implements OnInit, OnChanges {
  @Output() filter = new EventEmitter();
  @Input() tags: Tag[] = [];
  @Input() lessons: Lesson[] = [];

  public filterForm: FormGroup;
  public types = [
    {name: 'expressions', value: 'expressions'},
    {name: 'kanjis', value: 'kanjis'}
  ]

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      type: [this.types[0].value],
      lesson: [''],
      tags: this.formBuilder.group({})
    })
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.lessons && changes.lessons.currentValue.length > 0) {
      const emptyValue = { topic: 'All lessons', _id: '' , user: '', date: new Date(), link: ''};
      this.lessons.unshift(emptyValue);
      this.filterForm.get('lesson')?.setValue(this.lessons[0]._id);
    } else if (changes.tags && changes.tags.currentValue.length > 0) {
      const tagsForm = this.filterForm.get('tags') as FormGroup;
      this.tags.forEach(tag => {
        tagsForm.addControl(tag.name, new FormControl(false))
      })
    }
  }

  generateFilter() {
    const cardFilter: CardFilter = { user: '61478fb9b2cfde16186509b5' };
    cardFilter.type = this.filterForm.get('type')?.value;
    if (this.filterForm.get('lesson')?.value !== '') {
      cardFilter.lesson = this.filterForm.get('lesson')?.value;
    }
    const tagsFormValues = this.filterForm.get('tags')?.value;
    const checkedTags: string[] = Object.keys(tagsFormValues).filter(key =>
      tagsFormValues[key] ? key : null
    );
    if (checkedTags.length > 0) {
      const tagIds: string[] = checkedTags.map(checkedTag => {
        const tagObject = this.tags.find(tag => tag.name === checkedTag);
        return tagObject ? tagObject._id : '';
      })
      cardFilter.tags = tagIds;
    }
    return cardFilter;
  }

  sendFilter() {
    const filter = this.generateFilter();
    this.filter.emit(filter);
  }

}
