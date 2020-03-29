import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../restaurant';
import {RestaurantService} from '../restaurant.service'
import {Like} from '../like';
import {LikesService} from '../likes.service';
import {UserService} from '../user.service';
import { User } from '../user';
import {Friend } from '../friend';
import { FriendService } from '../friend.service';
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
  hasNext:boolean;
  restaurants;
  friend:Friend;
  ngOnInit(): void {
    //grab session user
    this.currentUser = this.userService.currentUser;
    
    //add likes to like list
    //grab restaurants
    this.restaurantService.getRestaurantListByLocation(this.currentUser.location).subscribe( data =>
      {this.restaurants = data
        console.log("test")
        console.log(this.restaurants);
        this.restaurant=this.restaurants[this.restaurants.length -1];
        // localstorage.setItem('Restaurants',JSON.stringify(this.restaurants));
        this.nextRestaurant();
      }
    );
    // this.restaurants=JSON.parse(localStorage.getItem('Restaurants'));
    console.log("Init userLike list");
    console.log(this.currentUser.likes);
  }

  clickLike(){
    console.log("test2")
    console.log(this.restaurants);
      console.log(this.restaurant.name);
      let like=new Like();
      like.is_liked=true;
      let rid = this.restaurant.id;
      like.r_id=rid;
      like.user_id = this.currentUser.id;
      this.friendService.onMatch(this.friend, like.r_id,this.restaurant.id)
      console.log("User liked " + like.r_id);
      this.postRateProcess(like);
  }

  clickDislike(){
      console.log(this.restaurant.name);
      let like=new Like();
      like.is_liked=false;
      let rid = this.restaurant.id;
      like.r_id=rid;
      like.user_id = this.currentUser.id;
      console.log(this.restaurant.name);
      console.log("User disliked " + like.r_id);
      
      this.postRateProcess(like);
  }

  postRateProcess(like:Like){
    this.nextRestaurant();
    this.currentUser.likes.push(like);
    console.log("Resteraunts rated: " + this.currentUser.likes.length);
    localStorage.setItem('User', JSON.stringify(this.currentUser));
    this.likeService.addLikeToDb(this.currentUser.id, like).subscribe(data => console.log(data), error => console.log(error));
  }

  nextRestaurant(){
    if(this.restaurants.length==0){
      this.hasNext=false;
    } else {
      let temp:Restaurant = this.restaurants.pop();
      let l;
      for(l of this.currentUser.likes){
        console.log("In loop");
        console.log(l);
        if(l.r_id == temp.id){
          this.nextRestaurant();
          return;
        }
      }
      this.restaurant = temp;
      this.friend = JSON.parse(localStorage.getItem('MatchingFriend'));
      console.log("display:")
      console.log(this.friend);
    }
  }
}
// import { Component, OnInit } from '@angular/core';
// import {Restaurant} from '../restaurant';
// import {RestaurantService} from '../restaurant.service'
// import {Like} from '../like';
// import {LikesService} from '../likes.service';
// import {UserService} from '../user.service';
// import { User } from '../user';
// @Component({
//   selector: 'app-restaurant-display',
//   templateUrl: './restaurant-display.component.html',
//   styleUrls: ['./restaurant-display.component.css']
// })
// export class RestaurantDisplayComponent implements OnInit {
//   constructor(private restaurantService:RestaurantService,private userService:UserService, private likeService: LikesService) { }
//   currentUser:User;
//   currentIndex: number = 0;
//   restaurant:Restaurant;
//   hasNext:boolean = true;
//   restaurants;
//   ngOnInit(): void {
//     //grab session user
//     this.currentUser = JSON.parse(localStorage.getItem('User'));
//     //add likes to like list
//     //grab restaurants
//     this.restaurantService.getRestaurantListByLocation(this.currentUser.location).subscribe( data =>
//       {this.restaurants = data
//         console.log("test")
//         console.log(this.restaurants);
//        // this.restaurant=this.restaurants[this.restaurants.length -1];
//         // localstorage.setItem('Restaurants',JSON.stringify(this.restaurants));
//         this.nextRestaurant();
//       }
//     );
//     // this.restaurants=JSON.parse(localStorage.getItem('Restaurants'));
//     console.log("Init userLike list");
//     console.log(this.currentUser.likes);
//   }
//   clickLike(){
//     console.log("test2")
//     console.log(this.restaurants);
//       console.log(this.restaurant.name);
//       let like=new Like();
//       like.is_liked=true;
//       let rid = this.restaurant.id;
//       like.r_id=rid;
//       like.user_id = this.currentUser.id;
//       console.log("User liked " + like.r_id);
//       this.postRateProcess(like);
//   }
//   clickDislike(){
//       console.log(this.restaurant.name);
//       let like=new Like();
//       like.is_liked=false;
//       let rid = this.restaurant.id;
//       like.r_id=rid;
//       like.user_id = this.currentUser.id;
//       console.log(this.restaurant.name);
//       console.log("User disliked " + like.r_id);
//       this.postRateProcess(like);
//   }
//   postRateProcess(like:Like){
//     this.nextRestaurant();
//     this.currentUser.likes.push(like);
//     console.log("Resteraunts rated: " + this.currentUser.likes.length);
//     localStorage.setItem('User', JSON.stringify(this.currentUser));
//     this.likeService.addLikeToDb(this.currentUser.id, like).subscribe(data => console.log(data), error => console.log(error));
//   }
//   nextRestaurant(){
//     if(this.restaurants.length==0){
//       this.hasNext=false;
//     } else {
//       let temp:Restaurant = this.restaurants.pop();
//       let l;
//       for(l of this.currentUser.likes){
//         console.log("In loop");
//         console.log(l);
//         if(l.r_id == temp.id){
//           this.nextRestaurant();
//           return;
//         }
//       }
//       this.restaurant = temp;
//     }
//   }
// }