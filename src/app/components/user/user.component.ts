import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/interfaces/user';
import { filter, map, Observable } from 'rxjs';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public user!: User;
  public gallery = 'likes';
  userImage: string = "https://flyclipart.com/thumb2/clipart-smiley-face-clip-art-black-and-white-science-clipart-319527.png";

  constructor(private userService: UserService,
    private _oktaStateService: OktaAuthStateService) { }

  ngOnInit(): void {
    // Getting the user from db using okta email and setting user var equal to that user
    this._oktaStateService.authState$
      .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
        .subscribe(u => this.setUserAndPicture(u)));

    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  setUserAndPicture(user: User) {
    this.user = user;
    if (this.user.profilePicURL) {
      this.userImage = user.profilePicURL;
    }
  }

  showAdds() {
    this.gallery = "adds"
  }

  showLikes() {
    this.gallery = "likes"
  }
}
