import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/interfaces/user';
import { filter, map, Observable } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public user!: User;
  public gallery = 'likes';

  constructor(private userService: UserService, 
              private _oktaStateService: OktaAuthStateService) { }
  
  ngOnInit(): void {
    // Getting the user from db using okta email and setting user var equal to that user
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));

    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  showAdds(){
    this.gallery = "adds"
  }

  showLikes(){
    this.gallery = "likes"
  }
}
