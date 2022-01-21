import { FetchedDataState } from '../../models/custom-types.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() fetchedDataState: FetchedDataState = 'init';
  @Input() dataType: string = 'data';
  @Input() textAlign: 'right' | 'left' | 'center' = 'center';

  constructor() { }

  ngOnInit(): void {
  }

}
