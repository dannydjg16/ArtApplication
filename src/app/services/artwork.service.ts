import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Artwork from '../interfaces/artwork';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  
  private baseUrl = `${environment.baseUrl}/artwork`;
  
  constructor(private http: HttpClient, 
              @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

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

  getArtOrderByYear(title?: string): Observable<Artwork[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Artwork[]>(`${this.baseUrl}/orderByYear`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  getArtworkById(id: number): Observable<Artwork> {
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

  getFullArtworkById(id: number): Observable<Artwork> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Artwork>(`${this.baseUrl}/full/${id}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  getArtworksByAdder(id: number): Observable<Artwork[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Artwork[]>(`${this.baseUrl}/adder/${id}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  getArtworksByLocation(id: number): Observable<Artwork[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Artwork[]>(`${this.baseUrl}/location/${id}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  getArtworksByArtist(id: number): Observable<Artwork[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Artwork[]>(`${this.baseUrl}/artist/${id}`, { headers: headers }).pipe(catchError((err) => {
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

  editArtwork(artWork: Artwork) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.put(`${this.baseUrl}/${artWork.id}`, artWork, { headers: headers}).pipe(catchError((err) => {
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
