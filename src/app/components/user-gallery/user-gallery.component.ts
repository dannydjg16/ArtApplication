import { Component, Input, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artwork from 'src/app/interfaces/artwork';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.css']
})
export class UserGalleryComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public likedArtworks!: Artwork[];
  @Input() theUser : any;

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _likeService: LikeService, 
              private _userService: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    // Get the User from okta, from db, then get users liked posts
    this._oktaStateService.authState$.subscribe(as => this._userService.getUserByEmail(as.accessToken?.claims.sub!)
    .subscribe(u => this._likeService.getUsersLikes(u.id).subscribe(likes => this.likedArtworks = likes)));
  }
}
