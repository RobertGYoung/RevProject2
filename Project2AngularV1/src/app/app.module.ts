import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Header2Component } from './header2/header2.component';
import { ProfileComponent } from './profile/profile.component';
import { CurrentUserDetailsComponent } from './current-user-details/current-user-details.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RestaurantDisplayComponent } from './restaurant-display/restaurant-display.component';
import { UserService} from './user.service';
import { ClearLikesComponent } from './clear-likes/clear-likes.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddFriendComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    Header2Component,
    ProfileComponent,
    CurrentUserDetailsComponent,
    PasswordResetComponent,
    RestaurantDisplayComponent,
    ClearLikesComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
