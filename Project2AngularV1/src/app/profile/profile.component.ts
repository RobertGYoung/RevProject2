import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Friend } from '../friend';
import {RestaurantService} from '../restaurant.service';
import { Router } from '@angular/router';
import { FriendService } from '../friend.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser:User;
  friends:Friend[];
  constructor(private userService:UserService,private friendService:FriendService, private restaurantService: RestaurantService, private router:Router) { }
  isMatch=false;

  ngOnInit(): void {
    this.currentUser= JSON.parse(localStorage.getItem('User'));
    this.friends=this.currentUser.friends;
  }
 onMatch(event,friend){
    this.friendService.onMatch(event, friend, this.currentUser )
    JSON.stringify(localStorage.setItem('MatchingFriend',friend));
    this.goToRestaurantDisplay(friend)
  }
 
  // onMatch(event, friend){
  //   this.isMatch=false;
  //   this.userService.getUser(friend.f_id).subscribe(data=>{
  //     for(let friendLike of data.likes){
  //       //console.log(friendLike)
  //       for(let userLike of this.currentUser.likes){
  //        // console.log(userLike)
  //         if(friendLike.r_id == userLike.r_id){
  //           this.isMatch=true;
  //           this.restaurantService.getRestaurant(friendLike.r_id).subscribe(data=>{
             
  //             alert(`You and ${friend.f_name} have a match for Restaurant: ${data.name} in ${data.location}`);
  //           })
            
  //         }
  //       }
  //     }
  //   //  console.log(this.isMatch);
  //     if(!this.isMatch){
  //       alert("No matching restaurant found from your friend "+friend.f_name)
  //     }
  //   })
  //   // this.goToRestaurantDisplay(friend)
  // }

  goToRestaurantDisplay(friend){
    
    this.router.navigate(['/display'])
    
  }
}
