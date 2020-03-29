import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../restaurant';
import {RestaurantService} from '../restaurant.service'
import {Like} from '../like';
import {LikesService} from '../likes.service';
import {UserService} from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-restaurant-display',
  templateUrl: './restaurant-display.component.html',
  styleUrls: ['./restaurant-display.component.css']
})
export class RestaurantDisplayComponent implements OnInit {

  constructor(private restaurantService:RestaurantService,private userService:UserService, private likeService: LikesService) { }
  currentUser:User;
  currentIndex: number = 0;
  restaurant:Restaurant;
  restaurants;
  likeList;

  ngOnInit(): void {
    //grab session user
    this.currentUser= JSON.parse(localStorage.getItem('User'));
    //add likes to like list
    //grab restaurants
    this.restaurants= this.restaurantService.getRestaurantListByLocation(this.currentUser.location).subscribe( data => this.restaurants = data)
    console.log("Init userLike list")
    console.log(this.currentUser.likes);

}

  clickLike(){
      this.restaurant=this.restaurants[this.currentIndex];
      console.log(this.restaurant.name);
      let like=new Like();
      like.is_liked=true;
      like.r_id=this.restaurant.id;
      like.user_id = this.currentUser.id
      console.log("User liked " + like.r_id);
      this.postRateProcess(like);
  }

  clickDislike(){
      this.restaurant=this.restaurants[this.currentIndex];
      let like=new Like();
      like.is_liked=false;
      like.r_id=this.restaurant.id;
      like.user_id = this.currentUser.id
      console.log(this.restaurant.name);
      console.log("User disliked " + like.r_id);
      this.postRateProcess(like);
  }

  postRateProcess(like:Like){
    this.currentUser.likes.push(like)
    console.log("Resteraunts rated: " + this.currentUser.likes.length)
    localStorage.setItem('User', JSON.stringify(this.currentUser));
    this.likeService.addLikeToDb(this.currentUser.id, like).subscribe(data => console.log(data), error => console.log(error));
    this.clickNext();
  }

  clickNext(){
    if(this.restaurants.length==0){
      console.log("No new resteraunts.");
    } else {
      let temp:Restaurant = this.restaurants.pop();
      let like;
      for(like in this.currentUser.likes){
        if(like.r_id == temp.id){
          this.clickNext();
        }
      }
      this.restaurant = temp;
    }
  }
}
