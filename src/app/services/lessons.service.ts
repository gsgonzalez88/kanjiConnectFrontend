import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lesson } from '../models/lesson.model';


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }

  getLessonsByUser(user: string) {
    return this.http.get<Lesson[]>(environment.lessons + '/user/' + user);
  }
}
