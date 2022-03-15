import { Injectable } from '@angular/core';
import  User  from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    const headers = {
      Accept: 'application/json'
    };

    return this.http.get<User[]>(`${this.baseUrl}`, { headers: headers })
  }

  getUserById(id: number | undefined): Observable<User>{
    const headers = {
      Accept: 'application/json'
    };

    return this.http.get<User>(`${this.baseUrl}/${id}`, { headers: headers })
  }

  getUserByEmail(email: string | undefined): Observable<User>{
    const headers = {
      Accept: 'application/json'
    };

    return this.http.get<User>(`${this.baseUrl}/email/${email}`, { headers: headers })
  }

  addUser(user: User) {
    const headers = {
      Accept: 'application/json'
    };

    return this.http.post(`${this.baseUrl}`, user, { headers: headers});
  }

  editUser(id: number, user: User) {
    const headers = {
      Accept: 'application/json'
    };

    return this.http.put(`${this.baseUrl}/${id}`, user, { headers: headers});
  }

  deleteUserById(id: number) {
    const headers = {
      Accept: 'application/json'
    };

    return this.http.delete(`${this.baseUrl}/${id}`, { headers: headers});
  }
}
