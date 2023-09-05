import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Property} from "../../shared/models/property";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }


  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.apiBaseUrl}/property/all`);
  }
  public addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(
      `${environment.apiBaseUrl}/property/add`,
      property
    );
  }
  public updateProperty(property: Property): Observable<Property> {
    return this.http.put<Property>(
      `${environment.apiBaseUrl}/property/update`,
      property
    );
  }
  public deleteProperty(propertyId: number): Observable<void>{
    return this.http.delete<void>(
      `${environment.apiBaseUrl}/property/delete/${propertyId}`);
  }
}
