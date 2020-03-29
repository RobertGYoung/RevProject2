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
  like:Like;
  likeList;

  ngOnInit(): void {
    this.currentUser= JSON.parse(localStorage.getItem('User'));
    console.log("Display:"+this.currentUser.location);
    this.restaurants= this.restaurantService.getRestaurantList().subscribe(
      data => {  
        this.restaurants = data;
              this.restaurantService.saveRestaurantsToSession(this.restaurants);
             
           }
      )
      this.likeList=this.likeService.getUserLikedList(this.currentUser);
      console.log("Init userLike list")
      console.log(this.likeList);
      
}

  clickLike(){
     
      this.restaurant=this.restaurants[this.currentIndex]
      console.log(this.restaurant.name)
      this.like=new Like;
      this.like.is_liked=true;
      this.like.r_id=this.restaurant.id;
      this.like.user_id=this.currentUser.id;
      console.log(this.like.is_liked);
      console.log(this.like.r_id);
      this.likeService.addLikeToDb(this.currentUser.id,this.like).subscribe(data => console.log(data), error => console.log(error));
      this.clickNext();
  }
  clickDislike(){
    this.restaurant=this.restaurants[this.currentIndex]
    console.log(this.restaurant.name)
    this.like=new Like;
    this.like.is_liked=false;
    this.like.r_id=this.restaurant.id;
    this.like.user_id=this.currentUser.id;
    this.likeService.addLikeToDb(this.currentUser.id,this.like).subscribe(data => console.log(data), error => console.log(error));
    this.clickNext();
  }
 
  clickNext(){
    if(this.currentIndex >= this.restaurants.length-1){
      this.currentIndex=0;
    }
   
   this.likeList=this.likeService.getUserLikedList(this.currentUser)
  
    this.currentIndex++;
  }
}
