import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import {User} from '../user';
@Component({
  selector: 'app-current-user-details',
  templateUrl: './current-user-details.component.html',
  styleUrls: ['./current-user-details.component.css']
})
export class CurrentUserDetailsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
  }
  saveUserToSession(user:User){
    this.userService.saveUserToSession(user);
  }
  showUserInSession(){
    this.userService.showUserInSession();

  }
}
