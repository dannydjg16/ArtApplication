import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Artwork from '../interfaces/artwork';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  
  private baseUrl = `${environment.baseUrl}/artwork`;
  
  constructor(private http: HttpClient) { }

  getArtworks(title?: string): Observable<Artwork[]> {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.get<Artwork[]>(`${this.baseUrl}`, { headers: headers })
  }

  getArtorkById(id: number): Observable<Artwork> {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.get<Artwork>(`${this.baseUrl}/${id}`, { headers: headers })
  }

  addArtwork(artWork: Artwork) {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.post(`${this.baseUrl}`, artWork, { headers: headers})
    // .pipe(catchError((err) => {
    //   console.error(err);
    //   throw err;
    // }));;
  } 

  editArtwork(id: number, artWork: Artwork) {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.put(`${this.baseUrl}/${id}`, artWork, { headers: headers})
  } 

  deleteArtwork(id: number) {
    const headers = {
      Accept: 'application/json',
    };

    return this.http.delete(`${this.baseUrl}/${id}`, { headers: headers});
  }
}
