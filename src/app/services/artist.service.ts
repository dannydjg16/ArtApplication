import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
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

    return this.http.get<Artist[]>(`${this.baseUrl}`, { headers: headers });
  }

  getAnArtist(id: number): Observable<Artist> {
    const headers = {
      Accept: 'application/json'
    };
    return this.http.get<Artist>(`${this.baseUrl}/${id}`, { headers: headers });
  }

  addArtist(artist: Artist) {
    const headers = {
      Accept: 'application/json'
    };
    
    return this.http.post(`${this.baseUrl}`, artist, {headers: headers}).pipe(catchError((err) => {
      console.error(err);
      throw err;
    }));
  }

  editArtist(artist: Artist | number): Observable<any> {
    const headers = {
      Accept: 'application/json'
    };
    
    const id = typeof artist === 'number' ? artist : artist.id;

    return this.http.put(`${this.baseUrl}/${id}`, artist, { headers: headers });
  }

  deleteArtist(artist: Artist | number): Observable<Artist> {
    const headers = {
      Accept: 'application/json'
    };

    const id = typeof artist === 'number' ? artist : artist.id;

    return this.http.delete<Artist>(`${this.baseUrl}/${id}`, { headers: headers});
  }
}
