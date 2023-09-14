import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solution } from '../../shared/models/solution';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SolutionService {
  
  constructor(private http: HttpClient) {}

  public getSolutions(): Observable<Solution[]> {
    return this.http.get<Solution[]>(`${environment.apiBaseUrl}/solution/all`);
  }
  public addSolution(solution: Solution): Observable<Solution> {
    return this.http.post<Solution>(
      `${environment.apiBaseUrl}/solution/add`,
      solution
    );
  }
  public updateSolution(solution: Solution): Observable<Solution> {
    return this.http.put<Solution>(
      `${environment.apiBaseUrl}/solution/update`,
      solution
    );
  }
  public deleteSolution(solutionId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiBaseUrl}/Solution/delete/${solutionId}`
    );
  }
}
