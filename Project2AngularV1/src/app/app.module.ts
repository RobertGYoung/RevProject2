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
import { RestaurantDisplayComponent } from './restaurant-display/restaurant-display.component';



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
    RestaurantDisplayComponent,

    
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
