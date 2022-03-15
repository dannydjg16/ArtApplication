import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Artist from '../interfaces/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseUrl = `${environment.baseUrl}/artists`;
  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    const headers = {
      Accept: 'application/json'
    };
    return this.http.get<Artist[]>(`${this.baseUrl}`, { headers: headers })
  }

  
}
