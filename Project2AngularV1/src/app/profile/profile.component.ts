import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser:User;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser= this.userService.showUserInSession();
  }
 

}
