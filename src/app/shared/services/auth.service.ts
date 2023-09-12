import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl: string = '';
  signUpUrl: string = '';

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/auth/login';
    this.signUpUrl = 'http://localhost:8080/auth/register';
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user);
  }

  signUp(user: User): Observable<any> {
    return this.http.post<any>(this.signUpUrl, user);
  }
}
