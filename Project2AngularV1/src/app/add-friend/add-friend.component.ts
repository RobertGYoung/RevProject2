import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import {UserService} from '../user.service';
import { User } from '../user';
import { Friend } from '../friend';
@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  user:User = new User();
  friend:Friend = new Friend();
  userName;
  userLocation;
  userId;
  errorMessage: string;
  submitted = false;
  currentUser;
  addFriendMessage: string="";

  
  constructor(private userService: UserService, private friendService: FriendService) { }

  ngOnInit(): void {
    this.currentUser= JSON.parse(localStorage.getItem('User'));
  }

  onSubmit(){
      this.userService.getUser(this.user.id).subscribe(data=>{
       this.userName = data.username;
       this.userId= data.id;
       this.userLocation=data.location;
       this.friend.f_id=data.id;
       this.friend.f_name=data.username;
       this.errorMessage="";
       this.submitted = true;
     },error =>{
       this.submitted=false;
       this.addFriendMessage="";
       this.errorMessage="This user is not found";
     })
     
     
  }

  onAddFriend(){
    this.friendService.createFriend(this.currentUser.id, this.friend ).subscribe(data=>{
      if(this.userName.username == undefined){
        this.addFriendMessage=`This user is already in your friendlist.`;
      }else{
        this.addFriendMessage=`${this.userName.username} has been added to your friendlist.`;
      }
      
    },error=>{
      this.addFriendMessage="error occurred, friend did not added."
    })

  }

}
