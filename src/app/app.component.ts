import { TagsService } from 'src/app/study/services/tags.service';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from './study/services/lessons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private lessonsService: LessonsService,
              private tagsService: TagsService) {}

  ngOnInit() {
    this.lessonsService.getLessons();
    this.tagsService.getTags();
  }
}
