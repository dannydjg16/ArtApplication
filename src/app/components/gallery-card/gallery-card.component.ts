import { Component, Input, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css']
})
export class GalleryCardComponent implements OnInit {

  @Input() theArtwork!: Artwork;
  @Input() theUser!: User;
  @Input() liked: any;
  hasUserLiked!: boolean;
  user!: User;

  constructor(private _oktaStateService: OktaAuthStateService,
              private _userService: UserService) { }

  ngOnInit(): void {
    this._oktaStateService.authState$.subscribe(as => this._userService.getUserByEmail(as.accessToken?.claims.sub!)
      .subscribe({
        next: (user) => this.user = user,
        error: () => null,
        complete: () => this.checkIfUserLiked(this.user)
      }));
  }

  checkIfUserLiked(user: User) {
    if (this.user.likes?.length) {
      for (var i = 0; i <= this.user.likes!.length-1; i++) {
        if (this.liked != 3) {
          if (this.user.likes[i].artId == this.theArtwork.id) {
            this.hasUserLiked = true;
          }
        }
      }
    }
  }
}
