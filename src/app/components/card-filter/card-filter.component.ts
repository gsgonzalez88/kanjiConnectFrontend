import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { CardFilter } from 'src/app/models/card-filter.model';
import { SelectValuesService } from 'src/app/services/select-values.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class CardFilterComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Input() tags: Tag[] = [];

  public filterForm: FormGroup;
  public panelOpenState: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private selectValuesService: SelectValuesService) {
    this.filterForm = this.formBuilder.group({
      type: [this.selectValuesService.getDefaultDataTypeValue()],
      lesson: [''],
      tags: ['']
    })
  }

  ngOnInit(): void {

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
    this.panelOpenState = false;
    this.filter.emit(filter);
  }

}
