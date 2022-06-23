import { Component, Input, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artwork from 'src/app/interfaces/artwork';
import Location from 'src/app/interfaces/location';
import User from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-location-works',
  templateUrl: './location-works.component.html',
  styleUrls: ['./location-works.component.css']
})
export class LocationWorksComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public artworks: Artwork[] = [];
  public signedInUser$!: User;
  @Input() location!: Location;
  @Input() locationWorks!: Artwork[]

  constructor(private _oktaStateService: OktaAuthStateService,
    // private _artworkService: ArtworkService,
    private _userService: UserService,
    // private route: ActivatedRoute,
    // private _router: Router
    ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    // Getting the signed in user to pass to the gallery card to pass to the post action
    this._oktaStateService.authState$
      .subscribe(as => this._userService.getUserByEmail(as.accessToken?.claims.sub!)
        .subscribe(u => this.signedInUser$ = u));
  }

}
