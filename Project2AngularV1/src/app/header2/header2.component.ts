import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  currentUser:User=this.userService.currentUser
  
  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  
  }
 
}
