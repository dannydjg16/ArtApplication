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
export class LikeService {

  private baseUrl = `${environment.baseUrl}/artwork`;

  constructor(private http: HttpClient, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  getUsersLikes(id: number): Observable<Artwork[]> {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<Artwork[]>(`${this.baseUrl}/${id}`, { headers: headers }).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }


  
}
