import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import LocationType from '../interfaces/locationtype';

@Injectable({
  providedIn: 'root'
})
export class LocationTypeService {

  private baseUrl = `${environment.baseUrl}/locationtype`;

  constructor(private http: HttpClient) { }

  getLocationTypes(): Observable<LocationType[]> {
    const headers = {
      Accept: 'application/json',
    }

    return this.http.get<LocationType[]>(`${this.baseUrl}`, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  addLocationType(locationType: LocationType) {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.post(`${this.baseUrl}`, locationType, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }
}
