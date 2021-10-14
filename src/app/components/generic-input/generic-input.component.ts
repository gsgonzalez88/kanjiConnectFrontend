import { Component, OnInit, Input } from '@angular/core';

@Component({
  template: `
    <mat-form-field>
      <input matInput placeholder="{{ 'englishMeaning' + number }}">
    </mat-form-field>
  `
})
export class GenericInputComponent implements OnInit {
  @Input() number: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
