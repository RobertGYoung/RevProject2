import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Friend } from '../friend';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser:User;
  friends:Friend[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser= JSON.parse(localStorage.getItem('User'));
    this.friends=this.currentUser.friends;
  }
 

}
