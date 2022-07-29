import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable } from 'rxjs';
import User from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'DGArt';
  public isAuthenticated$!: Observable<boolean>;
  public fullName$!: string;
  isAuthenticated = false;
  public user!: User;

  constructor(private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
    private userService: UserService) {

    this._oktaStateService.authState$.subscribe(
      s => this.isAuthenticated = s.isAuthenticated!
    );

  }

  public ngOnInit(): void {

    this._oktaStateService.authState$.subscribe(as => {
      this.updateAuthState(as.isAuthenticated!)
      if (this.isAuthenticated) {
        this.userService.getUserByEmail(as.accessToken?.claims.sub!)
          .subscribe({
            next: (_user) => this.navigateToGallery(),
            error: (_err) => this.userService.addUser({
              id: 0,
              email: as.accessToken?.claims.sub!,
              name: as.accessToken?.claims.name!,
              fromLocation: '',
              profilePicURL: ''
            }).subscribe({
                next: (a) => a,
                error: (_error) => 1 + 1
              })
          })
      }
    });

  }

  navigateToGallery() {
    if (this._router.url === '/') {
      this._router.navigate(['gallery']);
    }
  }

  updateAuthState(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }
}
