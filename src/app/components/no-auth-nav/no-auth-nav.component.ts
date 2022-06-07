import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-no-auth-nav',
  templateUrl: './no-auth-nav.component.html',
  styleUrls: ['./no-auth-nav.component.css']
})
export class NoAuthNavComponent implements OnInit {

  constructor(@Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  ngOnInit(): void {
  }

  public signIn() {
    this._oktaAuth.signInWithRedirect();
  }
}
