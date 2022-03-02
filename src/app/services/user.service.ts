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
}
