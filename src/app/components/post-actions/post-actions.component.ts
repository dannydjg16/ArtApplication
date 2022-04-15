import { Component, Input, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.css']
})
export class PostActionsComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;

  @Input() theArtwork : any;
  @Input() theUser : any;
  @Input() liked: any;

  constructor(private _oktaStateService: OktaAuthStateService, private _likeService: LikeService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public LikePost(art: Artwork, user: User) {
    this._likeService.likePost(art.id, user.id).subscribe(data => {
      console.log(data);
    });
  }

  public UnlikePost(art: Artwork, user: User) {
    this._likeService.likePost(art.id, user.id).subscribe(data => {
      console.log(data);
    });
  }
}
