import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { User } from '../user';



@Component({
  selector: 'app-clear-likes',
  templateUrl: './clear-likes.component.html',
  styleUrls: ['./clear-likes.component.css']
})
export class ClearLikesComponent implements OnInit {

  constructor(private userService:UserService) { }
  currentUser:User;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('User'));
  }

  clickClear(){
    this.userService.deleteUserLikes(this.currentUser.id).subscribe(
      data =>{
        console.log(data);
        localStorage.setItem('User', JSON.stringify(data));
        window.location.reload();
      },
      error => console.log(error)
    );
  }

}
