import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
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

  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth, private userService: UserService) {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._oktaStateService.authState$.subscribe(
      s => this.isAuthenticated = s.isAuthenticated!
    );
   }

  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._oktaStateService.authState$.subscribe(as => {
      if (this.isAuthenticated) {
        this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(
          () => this._router.navigate(['/gallery']),
          err => this.userService.addUser({ id: 0, email: as.accessToken?.claims.sub!, name: as.accessToken?.claims.name!, fromLocation: '', profilePicURL:''}).subscribe(
            () => this._router.navigate(['/']),
            () => this._router.navigate(['/'])
          ))
      }
    });
  }

  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      _ => this._router.navigate(['/profile'])
    );
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
}
