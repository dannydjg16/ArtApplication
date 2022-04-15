import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { ArtworkService } from 'src/app/services/artwork.service';
import  Artwork  from '../../interfaces/artwork';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;

  constructor(private _oktaStateService: OktaAuthStateService, private _artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  add(title: string, url: string, year: string, description: string, artist: string, medium: string, location: string) {
    const artwork = {
      title: title, filename: url, yearCreated: Number(year), description: description, locationNow: Number(location), artistID: Number(artist), mediumID: Number(medium)
    }

    this._artworkService.addArtwork(artwork as unknown as Artwork).subscribe(data => {
      console.log(data);
    });
  }

}
