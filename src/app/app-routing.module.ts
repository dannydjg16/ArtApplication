import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { AddArtComponent } from './components/add-art/add-art.component';
import { GeneralGalleryComponent } from './components/general-gallery/general-gallery.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';


const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'addwork', component: AddArtComponent },
  { path: 'gallery', component: GeneralGalleryComponent },
  { path: 'addartist', component: AddArtistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
