import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accent-button',
  templateUrl: './accent-button.component.html'
})
export class AccentButtonComponent implements OnInit {
  @Input() text = 'Cancel';
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
