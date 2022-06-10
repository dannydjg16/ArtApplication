import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Artist from '../interfaces/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private baseUrl = `${environment.baseUrl}/artists`;

  constructor(private http: HttpClient, 
              @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  getArtists(): Observable<Artist[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };

    return this.http.get<Artist[]>(`${this.baseUrl}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  getAnArtist(id: number): Observable<Artist> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };
    return this.http.get<Artist>(`${this.baseUrl}/${id}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  addArtist(artist: Artist) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };
    
    return this.http.post(`${this.baseUrl}`, artist, {headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  editArtist(artist: Artist | number): Observable<any> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };
    
    const id = typeof artist === 'number' ? artist : artist.ID;

    return this.http.put(`${this.baseUrl}/${id}`, artist, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  deleteArtist(artist: Artist | number): Observable<Artist> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };

    const id = typeof artist === 'number' ? artist : artist.ID;

    return this.http.delete<Artist>(`${this.baseUrl}/${id}`, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }
}
