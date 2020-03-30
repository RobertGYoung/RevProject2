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
  friendName;
  friendLocation;
  friendId;
  errorMessage: string;
  submitted = false;
  currentUser;
  addFriendMessage: string="";

  isFriendAdded=false;
  allFriendList;
  constructor(private userService: UserService, private friendService: FriendService) { }

  ngOnInit(): void {
    this.currentUser= JSON.parse(localStorage.getItem('User'));

     this.friendService.getFriendList().subscribe(data=>{
      this.allFriendList = data;
    })
  }
  onSubmit(){
      this.userService.getUser(this.user.id).subscribe(data=>{
       this.friendName = data.username;
       this.friendId= data.id;
       this.friendLocation=data.location;
       this.friend.f_id=this.user.id;
       this.friend.f_name=data.username;
       this.friend.c_id=this.currentUser.id;
       this.errorMessage="";
       this.submitted = true;
     },error =>{
       this.submitted=false;
       this.addFriendMessage="";
       this.errorMessage="This user is not found";
     })
     this.addFriendMessage="";
     this.errorMessage="";
  }

  onAddFriend(){  
    for(let friend of this.currentUser.friends){
      if(friend.f_name ==this.friend.f_name && friend.c_id==this.currentUser.id ){
      this.addFriendMessage=`This user is already in your friendlist.`;
      this.isFriendAdded=true;
      }
    }

    if(!this.isFriendAdded){
      this.addFriend();
    }
  }
  addFriend(){
    this.friendService.createFriend(this.currentUser.id, this.friend ).subscribe(data=>{
      this.addFriendMessage=`${this.friendName} has been added to your friendlist.`; 
      this.currentUser.friends.push(this.friend);
    localStorage.setItem('User', JSON.stringify(this.currentUser))
    console.log((JSON.parse(localStorage.getItem('User'))).friends)
    }, error=>{
      this.addFriendMessage="An error occurred, user did not added."
    })
  }

}
