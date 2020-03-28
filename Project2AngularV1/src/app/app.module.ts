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
import { IndexComponent } from './index/index.component';
import { Header2Component } from './header2/header2.component';
import { ProfileComponent } from './profile/profile.component';
import { CurrentUserDetailsComponent } from './current-user-details/current-user-details.component';
<<<<<<< HEAD
import { PasswordResetComponent } from './password-reset/password-reset.component';
=======
import { RestaurantDisplayComponent } from './restaurant-display/restaurant-display.component';

>>>>>>> abaf1ff7cafe532610d2fb8102800c21eb05241b


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddFriendComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    Header2Component,
    ProfileComponent,
    CurrentUserDetailsComponent,
<<<<<<< HEAD
    PasswordResetComponent
=======
    RestaurantDisplayComponent,

>>>>>>> abaf1ff7cafe532610d2fb8102800c21eb05241b
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
