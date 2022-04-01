import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  private baseUrl = `${environment.baseUrl}/locations`;
  
  constructor(private http: HttpClient) { }

  getLocations(name?: string): Observable<Location[]> {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.get<Location[]>(`${this.baseUrl}`, { headers: headers })
  }

  getLocationById(id: number): Observable<Location> {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.get<Location>(`${this.baseUrl}/${id}`, { headers: headers })
  }

  addLocation(location: Location) {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.post(`${this.baseUrl}`, location, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));;;
  }

  editLocation(id: number, location: Location) {
    const headers = {
      Accept: 'application/json',
    }

    return this.http.put(`${this.baseUrl}/${id}`, location, { headers: headers});
  }
}
