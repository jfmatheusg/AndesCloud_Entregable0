import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserSignUpInterface } from '../interfaces/user-sign-up.interface';
import { UserSessionService } from './user-session.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    public user: UserSessionService,
    public router: Router,
  ) { }

  signUp(userInfo: UserSignUpInterface) {
    return this.http
      .post<any>(`${environment.apiUrl}/create-user/`, { ...userInfo })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/api-auth/`, { username, password })
      .pipe(
        map(data => {
          // login successful if there's a jwt token in the response
          if (data && data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(username));
            this.user.ok = true;
          }
          return data;
        })
      );
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.reset();
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    return this.user.ok;
  }
}
