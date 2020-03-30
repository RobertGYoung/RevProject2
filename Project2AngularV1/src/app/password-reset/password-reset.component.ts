import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {UserService } from '../user.service';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {


  userDetail:User = new User();
  submitted=false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){

    this.userService.patchUser(this.userDetail.id, this.userDetail)
    .subscribe(
       data => console.log(data), error => console.log(error)
      );
      this.submitted=true;
  }

}
