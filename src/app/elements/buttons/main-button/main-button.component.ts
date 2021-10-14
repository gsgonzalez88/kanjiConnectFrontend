import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html'
})
export class MainButtonComponent implements OnInit {
  @Input() text = 'Search';
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
