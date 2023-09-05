import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  baseUrl = 'http://localhost:8080/user';
  constructor(private httpClient: HttpClient) {}

  registerUser(user: User): Observable<Object> {
    console.log(user);
    return this.httpClient.post(`${this.baseUrl}`, user);
  }
}