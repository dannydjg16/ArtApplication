import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artwork from 'src/app/interfaces/artwork';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-general-gallery',
  templateUrl: './general-gallery.component.html',
  styleUrls: ['./general-gallery.component.css']
})
export class GeneralGalleryComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public artworkss!: Artwork[];

  constructor(private _oktaStateService: OktaAuthStateService, private _artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  
    this._artworkService.getArtworks().subscribe(aws => this.artworkss = aws);
  }
}
