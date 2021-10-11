import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User, CreateUserDto } from '../models/user.model';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/users'

  constructor(private http: HttpClient) { }

  create(dto: CreateUserDto) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  mock() {
    return this.http.get<User>(this.apiUrl, { context: checkTime() });
  }
}
