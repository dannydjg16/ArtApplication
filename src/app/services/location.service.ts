import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Location from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  private baseUrl = `${environment.baseUrl}/locations`;
  
  constructor(private http: HttpClient, 
              @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  getLocations(): Observable<Location[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Location[]>(`${this.baseUrl}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  getLocationsABC(): Observable<Location[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Location[]>(`${this.baseUrl}/abc`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  getLocationById(id: number): Observable<Location> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Location>(`${this.baseUrl}/${id}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  addLocation(location: Location) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.post(`${this.baseUrl}`, location, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  editLocation(location: Location) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    }

    return this.http.put(`${this.baseUrl}/${location.id}`, location, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }
}
