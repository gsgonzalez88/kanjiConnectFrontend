import { Component, OnInit } from '@angular/core';
import { LessonsService } from './services/lessons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private lessonsService: LessonsService) {}

  ngOnInit() {
    this.lessonsService.getLessons();
  }
}
