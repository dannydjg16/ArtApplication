import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'users', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
