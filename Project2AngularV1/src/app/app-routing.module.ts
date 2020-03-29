import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
//comment
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {RestaurantDisplayComponent} from './restaurant-display/restaurant-display.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent},
   {path: 'profile/:id',component: ProfileComponent},
   {path: 'profile',component: ProfileComponent},
   {path: 'addFriend/:id', component : AddFriendComponent},
   {path: 'addFriend', component : AddFriendComponent},
   {path: 'passwordreset', component: PasswordResetComponent },
   {path: 'display', component: RestaurantDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
