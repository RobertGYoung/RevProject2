import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent},
   {path: 'profile/:id',component: ProfileComponent},
   {path: 'profile',component: ProfileComponent},
   {path: 'addFriend/:id', component : AddFriendComponent},
   {path: 'addFriend', component : AddFriendComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
