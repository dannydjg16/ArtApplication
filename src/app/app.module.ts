import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserComponent } from './components/View-Objects/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { NoAuthNavComponent } from './components/no-auth-nav/no-auth-nav.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './components/footer/footer.component';
import { GeneralGalleryComponent } from './components/Galleries/general-gallery/general-gallery.component';
import { UserGalleryComponent } from './components/Galleries/user-gallery/user-gallery.component';
import { GalleryCardComponent } from './components/Cards/gallery-card/gallery-card.component';
import { NotAuthComponent } from './components/not-auth/not-auth.component';
import { AddArtComponent } from './components/Add-Objects/add-art/add-art.component';
import { AddArtistComponent } from './components/Add-Objects/add-artist/add-artist.component';
import { ArtistGalleryComponent } from './components/Galleries/artist-gallery/artist-gallery.component';
import { ArtistCardComponent } from './components/Cards/artist-card/artist-card.component';
import { AddLocationComponent } from './components/Add-Objects/add-location/add-location.component';
import { PostActionsComponent } from './components/Cards/post-actions/post-actions.component';
import { LocationGalleryComponent } from './components/Galleries/location-gallery/location-gallery.component';
import { LocationCardComponent } from './components/Cards/location-card/location-card.component';
import { EditProfileComponent } from './components/Edit-Objects/edit-profile/edit-profile.component';
import { UserArtworksComponent } from './components/Galleries/user-artworks/user-artworks.component';
import { EditArtworkComponent } from './components/Edit-Objects/edit-artwork/edit-artwork.component';
import { ViewArtworkComponent } from './components/View-Objects/view-artwork/view-artwork.component';
import { EditArtistComponent } from './components/Edit-Objects/edit-artist/edit-artist.component';
import { FormsModule } from '@angular/forms';
import { EditLocationComponent } from './components/Edit-Objects/edit-location/edit-location.component';
import { AddLocationTypeComponent } from './components/Add-Objects/add-location-type/add-location-type.component';
import { AddArtTypeComponent } from './components/Add-Objects/add-art-type/add-art-type.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewArtistComponent } from './components/View-Objects/view-artist/view-artist.component';
import { ArtistWorksComponent } from './components/Galleries/artist-works/artist-works.component';
import { ViewLocationComponent } from './components/View-Objects/view-location/view-location.component';
import { LocationWorksComponent } from './components/Galleries/location-works/location-works.component';

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
    NoAuthNavComponent,
    AuthNavComponent,
    FooterComponent,
    GeneralGalleryComponent,
    UserGalleryComponent,
    GalleryCardComponent,
    NotAuthComponent,
    AddArtComponent,
    AddArtistComponent,
    ArtistGalleryComponent,
    ArtistCardComponent,
    AddLocationComponent,
    PostActionsComponent,
    LocationGalleryComponent,
    LocationCardComponent,
    EditProfileComponent,
    UserArtworksComponent,
    EditArtworkComponent,
    ViewArtworkComponent,
    EditArtistComponent,
    EditLocationComponent,
    AddLocationTypeComponent,
    AddArtTypeComponent,
    ViewArtistComponent,
    ArtistWorksComponent,
    ViewLocationComponent,
    LocationWorksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OktaAuthModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    NgbDropdownModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }