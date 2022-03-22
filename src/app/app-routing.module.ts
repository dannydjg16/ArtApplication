import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { AddArtComponent } from './components/add-art/add-art.component';


const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'addwork', component: AddArtComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
