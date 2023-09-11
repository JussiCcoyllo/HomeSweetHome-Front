import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue';
import { environment } from '../../environments/environment';
 

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private http: HttpClient) {}

  public getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.apiBaseUrl}/issue/all`);
  }
  public addIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${environment.apiBaseUrl}/issue/add`, issue);
  }
  public updateIssue(issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(
      `${environment.apiBaseUrl}/issue/update`,
      issue
    );
  }
  public deleteIssue(issueId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiBaseUrl}/issue/delete/${issueId}`
    );
  }
}