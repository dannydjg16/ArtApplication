import { Component, OnInit, Inject } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable, of, Subscription } from 'rxjs';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/interfaces/user';


@Component({
  selector: 'app-okta-user',
  templateUrl: './okta-user.component.html',
  styleUrls: ['./okta-user.component.css']
})
export class OktaUserComponent implements OnInit {

  public name$!: Observable<string>;
  public isAuthenticated$!: Observable<boolean>;
  public fullName$!: string;
  public user$!: User;

  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, private userService: UserService) { }

  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false),
    );

    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.fullName$ = u.name));

    this.name$ = this._oktaStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.accessToken?.claims.sub ?? 'Okta-User-Component')
    );
  }
}
