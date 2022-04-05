import { Injectable } from '@angular/core';
import  User  from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { catchError, Observable } from 'rxjs';
import { OktaAuth } from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient, private _oktaAuth: OktaAuth) { }

  getUsers(): Observable<User[]>{
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };

    return this.http.get<User[]>(`${this.baseUrl}`, { headers: headers })
  }

  getUserById(id: number | undefined): Observable<User>{
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };

    return this.http.get<User>(`${this.baseUrl}/${id}`, { headers: headers })
  }

  getUserByEmail(email: string | undefined): Observable<User>{
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };

    return this.http.get<User>(`${this.baseUrl}/email/${email}`, { headers: headers })
  }

  addUser(user: User) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };

    return this.http.post(`${this.baseUrl}`, user, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  editUser(id: number, user: User) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };

    return this.http.put(`${this.baseUrl}/${id}`, user, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  deleteUserById(id: number) {
    const accessToken = this._oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    };

    return this.http.delete(`${this.baseUrl}/${id}`, { headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }
}
