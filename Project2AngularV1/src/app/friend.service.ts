import { Injectable } from '@angular/core';
import { Friend } from './friend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user';
import { RestaurantService } from './restaurant.service';
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl = 'http://localhost:9090/api/v1/';
  currentFriends:Friend[];
  
  
  isMatch:boolean;

  constructor(private http: HttpClient,private userService:UserService,private restaurantService:RestaurantService) { }


  getFriendList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/friends`);
  }

  getFriend(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/friends/${id}`);
  }

  createFriend(userId: number, friend: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${userId}/friends`, friend);
  }

  deleteFriend(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/friends/${id}`, { responseType: 'text' });
  }

  onMatch(event, friend, currentUser:User){
    this.isMatch=false;
    this.userService.getUser(friend.f_id).subscribe(data=>{
      for(let friendLike of data.likes){
        //console.log(friendLike)
        for(let userLike of currentUser.likes){
         // console.log(userLike)
          if(friendLike.r_id == userLike.r_id){
            this.isMatch=true;
            this.restaurantService.getRestaurant(friendLike.r_id).subscribe(data=>{
             
              alert(`You and ${friend.f_name} have a match for Restaurant: ${data.name} in ${data.location}`);
            })
            
          }
        }
      }
    //  console.log(this.isMatch);
      if(!this.isMatch){
        alert("No matching restaurant found from your friend "+friend.f_name)
      }
    })
    // this.goToRestaurantDisplay(friend)
  }
}
