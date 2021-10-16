import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmptyLesson, Lesson } from '../models/lesson.model';


@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private user = '61478fb9b2cfde16186509b5';
  private lessons = new BehaviorSubject<Lesson[]>([]);
  lessons$ = this.lessons.asObservable();

  constructor(private http: HttpClient) { }

  getLessonsByUser(user: string) {
    return this.http.get<Lesson[]>(environment.lessons + '/user/' + user);
  }

  getLessons() {
    this.http.get<Lesson[]>(environment.lessons + '/user/' + this.user).subscribe(
      res => {
        res.unshift(EmptyLesson);
        this.lessons.next(res)
      }
    )
  }
}
