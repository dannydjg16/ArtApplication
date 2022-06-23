import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artist from 'src/app/interfaces/artist';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import { ArtworkService } from 'src/app/services/artwork.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-artist-works',
  templateUrl: './artist-works.component.html',
  styleUrls: ['./artist-works.component.css']
})
export class ArtistWorksComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public artworkss: Artwork[] = [];
  public signedInUser$!: User;
  @Input() worksOfArtist!: Artist;

  constructor(private _oktaStateService: OktaAuthStateService,
    private _artworkService: ArtworkService,
    private _userService: UserService,
    private route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    // Getting the signed in user to pass to the gallery card to pass to the post action
    this._oktaStateService.authState$
      .subscribe(as => this._userService.getUserByEmail(as.accessToken?.claims.sub!)
        .subscribe(u => this.signedInUser$ = u));

    this._artworkService.getArtworksByArtist(this.route.snapshot.params['id'])
      .subscribe(aws => this.artworkss = aws);
  }

  addWorkOfArtist() {
    var artistIdNumber = this.route.snapshot.params['id'];
    this._router.navigate([`addwork/${artistIdNumber}`]);
  }

}
