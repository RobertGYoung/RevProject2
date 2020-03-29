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

  isFriendAdded=false;
  friendList;
  constructor(private userService: UserService, private friendService: FriendService) { }

  ngOnInit(): void {
    this.currentUser= JSON.parse(localStorage.getItem('User'));
    this.friendService.getFriendList().subscribe(data=>{
      this.friendList = data;
      
    })

    
  }

  onSubmit(){
      this.userService.getUser(this.user.id).subscribe(data=>{
       this.userName = data.username;
       this.userId= data.id;
       this.userLocation=data.location;
       this.friend.f_id=this.currentUser.id;
       this.friend.f_name=data.username;
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
    this.isFriendAdded=false;
    console.log(this.userId);
    if(this.friendList.length <1){
        this.addFriend();
    }
    for(let friend of this.friendList){
      if(friend.f_name ==this.userName && friend.f_id==this.currentUser.id){
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
      this.addFriendMessage=`${this.userName} has been added to your friendlist.`;   
    }, error=>{
      this.addFriendMessage="An error occurred, user did not added."
    })
  }

}
