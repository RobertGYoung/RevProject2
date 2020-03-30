
import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../restaurant';
import {RestaurantService} from '../restaurant.service'
import {Like} from '../like';
import {LikesService} from '../likes.service';
import {UserService} from '../user.service';
import { User } from '../user';
import { FriendService } from '../friend.service';
import {Friend } from '../friend';
@Component({
  selector: 'app-restaurant-display',
  templateUrl: './restaurant-display.component.html',
  styleUrls: ['./restaurant-display.component.css']
})
export class RestaurantDisplayComponent implements OnInit {
  constructor(private restaurantService:RestaurantService,private userService:UserService,private friendService:FriendService, private likeService: LikesService) { }
  currentUser:User;
  currentIndex: number = 0;
  restaurant:Restaurant;
  hasNext:boolean = true;
  restaurants;
  friend:Friend;
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('User'));
    //add likes to like list
    //grab restaurants
    this.restaurantService.getRestaurantListByLocation(this.currentUser.location).subscribe( data =>
      {this.restaurants = data
       
        this.nextRestaurant();
      }
    );
 
  }
  clickLike(){

      let like=new Like();
      like.is_liked=true;
      let rid = this.restaurant.id;
      like.r_id=rid;
      like.user_id = this.currentUser.id;
      this.friendService.onMatch(this.friend, like.r_id,this.restaurant.id)
      this.postRateProcess(like);
  }
  clickDislike(){
      let like=new Like();
      like.is_liked=false;
      let rid = this.restaurant.id;
      like.r_id=rid;
      like.user_id = this.currentUser.id;
      this.postRateProcess(like);
  }
  postRateProcess(like:Like){
    this.nextRestaurant();
    this.currentUser.likes.push(like);
    localStorage.setItem('User', JSON.stringify(this.currentUser));
    this.likeService.addLikeToDb(this.currentUser.id, like).subscribe(data =>  error => console.log(error));
  }
  nextRestaurant(){
    if(this.restaurants.length==0){
      this.hasNext=false;
    } else {
      let temp:Restaurant = this.restaurants.pop();
      let l;
      for(l of this.currentUser.likes){
   
        if(l.r_id == temp.id){
          this.nextRestaurant();
          return;
        }
      }
      this.restaurant = temp;
      this.friend = JSON.parse(localStorage.getItem('MatchingFriend'));
    }
  }
}