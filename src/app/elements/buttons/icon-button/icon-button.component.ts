import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent implements OnInit {
  @Input() iconName: string = 'done';
  @Input() disabled: boolean = false;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

}
