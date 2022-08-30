import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artist from 'src/app/interfaces/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-gallery',
  templateUrl: './artist-gallery.component.html',
  styleUrls: ['./artist-gallery.component.css']
})
export class ArtistGalleryComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public artists!: Artist[];

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _artistService: ArtistService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._artistService.getArtists().subscribe(arts => this.artists = arts);
  }
}
