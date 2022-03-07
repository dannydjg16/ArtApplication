import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState } from '@okta/okta-auth-js';

@Component({
  selector: 'app-okta-user',
  templateUrl: './okta-user.component.html',
  styleUrls: ['./okta-user.component.css']
})
export class OktaUserComponent implements OnInit {

  public name$!: Observable<string>;

  constructor(private _oktaAuthStateService: OktaAuthStateService) { }

  public ngOnInit(): void {
    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
    console.log("User: " , this.name$);
  }

}
