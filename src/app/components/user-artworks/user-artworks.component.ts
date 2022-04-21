import { Component, Input, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artwork from 'src/app/interfaces/artwork';
import { ArtworkService } from 'src/app/services/artwork.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-artworks',
  templateUrl: './user-artworks.component.html',
  styleUrls: ['./user-artworks.component.css']
})
export class UserArtworksComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public addedArtworks!: Artwork[];
  @Input() theUser : any;

  constructor(private _oktaStateService: OktaAuthStateService, 
    private _artworkService: ArtworkService, 
    private _userService: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    // Get the User from okta, from db, then get users added artworks
    
  }

}
