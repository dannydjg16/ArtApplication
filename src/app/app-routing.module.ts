import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { AddArtComponent } from './components/add-art/add-art.component';
import { GeneralGalleryComponent } from './components/general-gallery/general-gallery.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { ArtistGalleryComponent } from './components/artist-gallery/artist-gallery.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditArtworkComponent } from './components/edit-artwork/edit-artwork.component';
import { EditArtistComponent } from './components/edit-artist/edit-artist.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { LocationGalleryComponent } from './components/location-gallery/location-gallery.component';
import { ViewArtistComponent } from './components/view-artist/view-artist.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'addwork/:id', component: AddArtComponent },
  { path: 'gallery', component: GeneralGalleryComponent },
  { path: 'addartist', component: AddArtistComponent },
  { path: 'artists', component: ArtistGalleryComponent },
  { path: 'addlocation', component: AddLocationComponent },
  { path: 'profile', component: UserComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'editart/:id', component: EditArtworkComponent },
  { path: 'editartist/:id', component: EditArtistComponent },
  { path: 'editlocation/:id', component: EditLocationComponent },
  { path: 'locations', component: LocationGalleryComponent},
  { path: 'viewartist/:id', component: ViewArtistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
