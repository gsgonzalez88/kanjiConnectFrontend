import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accent-button',
  templateUrl: './accent-button.component.html'
})
export class AccentButtonComponent implements OnInit {
  @Input() text = 'Cancel';

  constructor() { }

  ngOnInit(): void {
  }

}
