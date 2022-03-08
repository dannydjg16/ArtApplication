import { Component, OnInit, Inject } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-okta-user',
  templateUrl: './okta-user.component.html',
  styleUrls: ['./okta-user.component.css']
})
export class OktaUserComponent implements OnInit {

  public name$!:Observable<string>;
  public isAuthenticated$!: Observable<boolean>;
  public AuthStateHere!: Observable<AuthState>;
  public name!: string | null;



  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  public ngOnInit(): void {
    // this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
    //   filter((s: AuthState) => !!s),
    //   map((s: AuthState) => s.isAuthenticated ?? false)
    // );

   // this._oktaStateService.authState$.subscribe(a =>  this.setName(a.idToken?.claims.name!));

    // this._oktaAuth.getUser().then(u => this.setName(u.|| 'aaaaaaaa'));
    // this._oktaStateService.authState$.pipe(a => a.subscribe())



    // this.AuthStateHere = this._oktaStateService.authState$.pipe(
    //   filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
    //   map((authState: AuthState) => authState ?? 'joe')
    // );

    this.name$ = this._oktaStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken!.claims.name! ?? 'kj')
    );
  }

  public conLog(){
    console.log(this.name$);
  }

  private async setName(str: string) {
    this.name = str;
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
