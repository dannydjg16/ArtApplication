import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Artwork from '../interfaces/artwork';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  
  private baseUrl = `${environment.baseUrl}/artwork`;
  
  constructor(private http: HttpClient, private _oktaAuth: OktaAuth) { }

  getArtworks(title?: string): Observable<Artwork[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Artwork[]>(`${this.baseUrl}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  getArtorkById(id: number): Observable<Artwork> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Artwork>(`${this.baseUrl}/${id}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  addArtwork(artWork: Artwork) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.post(`${this.baseUrl}`, artWork, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  } 

  editArtwork(id: number, artWork: Artwork) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.put(`${this.baseUrl}/${id}`, artWork, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  } 

  deleteArtwork(id: number) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.delete(`${this.baseUrl}/${id}`, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }
}
