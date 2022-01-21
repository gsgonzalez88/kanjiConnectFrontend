import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserKanji, UserKanjiFilter } from '../models/user-kanji.model';

@Injectable({
  providedIn: 'root'
})
export class UserKanjiService {

  constructor(private http: HttpClient) { }

  filterUserKanji(filter: UserKanjiFilter) {
    return this.http.post<UserKanji[]>(environment.userKanji + '/filter', filter);
  }
}
