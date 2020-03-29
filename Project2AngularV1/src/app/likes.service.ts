import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Like} from './like';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class LikesService {
  currentUser:User;
  likes:Like
  constructor(private userService:UserService, private http: HttpClient) { }
  private baseUrl = 'http://localhost:9090/api/v1/';
  
 //http://localhost:9090/api/v1/24/likes
  addLikeToDb(userId:number,like:Object): Observable<Object>{
    return this.http.post(`${this.baseUrl}/${userId}/likes`, like);

  }
  getUserLikedList(user:User){
   this.currentUser=user;

   return this.currentUser.likes;
  }
}
