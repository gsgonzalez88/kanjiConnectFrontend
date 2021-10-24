import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { SelectValuesService } from 'src/app/services/select-values.service';
import { CardFilterService } from './card-filter.service';

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
              private selectValuesService: SelectValuesService,
              private cardFilterService: CardFilterService) {
    this.filterForm = this.formBuilder.group({
      type: [this.selectValuesService.getDefaultDataTypeValue()],
      lesson: [''],
      source: [''],
      jlpt: null,
      transitivity: null,
      difficulty: null,
      tags: ['']
    })
  }

  ngOnInit(): void {

  }

  sendFilter() {
    const filter = this.cardFilterService.generateFilter(this.filterForm.value);
    this.panelOpenState = false;
    this.filter.emit(filter);
  }

}
