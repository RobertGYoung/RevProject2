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
    //grab session user
    this.currentUser= JSON.parse(localStorage.getItem('User'));
    //add likes to like list
    this.likeList=this.currentUser.likes;
    //grab restaurants
      this.restaurants= this.restaurantService.getRestaurantList().subscribe( data => this.restaurants = data)
      console.log("Init userLike list")
      console.log(this.likeList);
      
}

  clickLike(){
      this.likeList=this.likeService.getUserLikedList(this.currentUser);
      this.restaurant=this.restaurants[this.currentIndex]
      console.log(this.restaurant.name)
      this.like=new Like;
      this.like.is_liked=true;
      this.like.r_id=this.restaurant.id;
      this.like.user_id=this.currentUser.id;
      console.log(this.like.is_liked);
      console.log(this.like.r_id);
      this.currentUser.likes.push(this.like)
      console.log(this.currentUser.likes.length)
      console.log(this.likeList.length)

      localStorage.setItem('User', JSON.stringify(this.currentUser));
      this.likeService.addLikeToDb(this.currentUser.id,this.like).subscribe(data => console.log(data), error => console.log(error));
      this.clickNext();
  }
  clickDislike(){
    this.likeList=this.likeService.getUserLikedList(this.currentUser);
    this.restaurant=this.restaurants[this.currentIndex]
    console.log(this.restaurant.name)
    this.like=new Like;
    this.like.is_liked=false;
    this.like.r_id=this.restaurant.id;
    this.like.user_id=this.currentUser.id;
          console.log(this.like.is_liked);
      console.log(this.like.r_id);
      this.currentUser.likes.push(this.like)
      console.log(this.currentUser.likes.length)
      console.log(this.likeList.length)

      localStorage.setItem('User', JSON.stringify(this.currentUser));
    this.likeService.addLikeToDb(this.currentUser.id,this.like).subscribe(data => console.log(data), error => console.log(error));
    this.clickNext();
  }
 
  clickNext(){
   
    if(this.currentIndex >= this.restaurants.length-1){
      this.currentIndex=0;
    }
    //change this 
     if(this.restaurants[this.currentIndex].id==this.like.r_id){
       console.log("should delte")
     
      }
      console.log(this.restaurants[this.currentIndex].id+" and " + this.like.r_id) 
      // change the like.rid to check if present in the currentUser.like
    this.currentIndex++;
  }
}
