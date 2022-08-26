import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import { ArtworkService } from 'src/app/services/artwork.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-general-gallery',
  templateUrl: './general-gallery.component.html',
  styleUrls: ['./general-gallery.component.css']
})
export class GeneralGalleryComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public artworkss!: Artwork[];
  public signedInUser$!: User;
  user!: User;

  constructor(private _oktaStateService: OktaAuthStateService,
    private _artworkService: ArtworkService,
    private _userService: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._oktaStateService.authState$.subscribe(as => this._userService.getUserByEmail(as.accessToken?.claims.sub!)
      .subscribe({
        next: (user) => this.user = user,
        error: () => null,
        complete: () => null
      }));
      // Change this to function with search 
    this._artworkService.getArtworks().subscribe(aws => this.artworkss = aws);
  }

  orderArtByYear() {
    this._artworkService.getArtOrderByYear().subscribe(aws => this.artworkss = aws);
  }
}
