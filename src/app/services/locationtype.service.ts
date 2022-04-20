import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import LocationType from '../interfaces/locationtype';

@Injectable({
  providedIn: 'root'
})
export class LocationTypeService {

  private baseUrl = `${environment.baseUrl}/locationtype`;

  constructor(private http: HttpClient, 
              @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  getLocationTypes(): Observable<LocationType[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    }

    return this.http.get<LocationType[]>(`${this.baseUrl}`, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  addLocationType(locationType: LocationType) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.post(`${this.baseUrl}`, locationType, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }
}
