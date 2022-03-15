import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ArtType from '../interfaces/arttype';

@Injectable({
  providedIn: 'root'
})
export class ArttypeService {

  private baseUrl = `${environment.baseUrl}/arttype`;

  constructor(private http: HttpClient) { }

  getArtTypes(): Observable<ArtType[]> {
    const headers = {
      Accept: 'application/json',
    };
    return this.http.get<ArtType[]>(`${this.baseUrl}`, { headers: headers })
  }

  addArtType(arttype: ArtType) {
    const headers = {
      Accept: 'application/json'
    };
    return this.http.post(`${this.baseUrl}`, arttype, {headers: headers});
  }
}
