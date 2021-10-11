import { Component, OnInit, Input } from '@angular/core';
import { FetchedDataState } from 'src/app/models/custom-types.model';

@Component({
  selector: 'app-review-counter',
  templateUrl: './review-counter.component.html',
  styleUrls: ['./review-counter.component.scss']
})
export class ReviewCounterComponent implements OnInit {
  @Input() total: number = 0;
  @Input() currentIndex: number = 0;
  @Input() fetchedDataState: FetchedDataState = 'init';

  constructor() { }

  ngOnInit(): void {
  }

}
