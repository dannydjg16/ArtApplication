import { NgModule } from '@angular/core';
import { UserComponent } from './components/View-Objects/user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { AddArtComponent } from './components/Add-Objects/add-art/add-art.component';
import { GeneralGalleryComponent } from './components/Galleries/general-gallery/general-gallery.component';
import { AddArtistComponent } from './components/Add-Objects/add-artist/add-artist.component';
import { ArtistGalleryComponent } from './components/Galleries/artist-gallery/artist-gallery.component';
import { AddLocationComponent } from './components/Add-Objects/add-location/add-location.component';
import { EditProfileComponent } from './components/Edit-Objects/edit-profile/edit-profile.component';
import { EditArtworkComponent } from './components/Edit-Objects/edit-artwork/edit-artwork.component';
import { EditArtistComponent } from './components/Edit-Objects/edit-artist/edit-artist.component';
import { EditLocationComponent } from './components/Edit-Objects/edit-location/edit-location.component';
import { LocationGalleryComponent } from './components/Galleries/location-gallery/location-gallery.component';
import { ViewArtistComponent } from './components/View-Objects/view-artist/view-artist.component';
import { ViewLocationComponent } from './components/View-Objects/view-location/view-location.component';
import { ViewArtworkComponent } from './components/View-Objects/view-artwork/view-artwork.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'addwork', component: AddArtComponent },
  { path: 'gallery', component: GeneralGalleryComponent },
  { path: 'addartist', component: AddArtistComponent },
  { path: 'artists', component: ArtistGalleryComponent },
  { path: 'addlocation', component: AddLocationComponent },
  { path: 'profile', component: UserComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'editart/:id', component: EditArtworkComponent },
  { path: 'editartist/:id', component: EditArtistComponent },
  { path: 'editlocation/:id', component: EditLocationComponent },
  { path: 'locations', component: LocationGalleryComponent },
  { path: 'viewartist/:id', component: ViewArtistComponent },
  { path: 'viewlocation/:id', component: ViewLocationComponent },
  { path: 'viewartwork/:id', component: ViewArtworkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
