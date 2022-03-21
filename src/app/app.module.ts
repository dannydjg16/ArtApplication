import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { OktaAuthModule, OKTA_CONFIG, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaUserComponent } from './components/okta-user/okta-user.component';
import { NoAuthNavComponent } from './components/no-auth-nav/no-auth-nav.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './components/footer/footer.component';
import { GeneralGalleryComponent } from './components/general-gallery/general-gallery.component';
import { UserGalleryComponent } from './components/user-gallery/user-gallery.component';
import { GalleryCardComponent } from './components/gallery-card/gallery-card.component';
import { IsAuthComponent } from './components/is-auth/is-auth.component';
import { NotAuthComponent } from './components/not-auth/not-auth.component';


const oktaAuth = new OktaAuth({
  issuer: 'https://dev-7824301.okta.com/oauth2/default',
  clientId: '0oa41j4h92rnKJ2Xr5d7',
  redirectUri: `${window.location.origin}/login/callback`,
  pkce: true,
  scopes: ['openid'],
  postLogoutRedirectUri: window.location.origin,
});


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    OktaUserComponent,
    NoAuthNavComponent,
    AuthNavComponent,
    FooterComponent,
    GeneralGalleryComponent,
    UserGalleryComponent,
    GalleryCardComponent,
    IsAuthComponent,
    NotAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OktaAuthModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
