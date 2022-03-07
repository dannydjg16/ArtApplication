import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';


const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'usera', component: OktaCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
