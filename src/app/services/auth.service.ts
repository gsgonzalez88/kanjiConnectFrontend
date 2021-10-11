import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User, CreateUserDto } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(environment.login, { email, password })
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token))
      )
  }

  profile(token: string) {
    //const headers = new HttpHeaders();
    //headers.set('Authorization', 'Bearer ' + token)
    return this.http.get<User>(environment.login + '/profile');
  }
}
