import { Injectable } from '@angular/core';
import { Friend } from './friend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl = 'http://localhost:9090/api/v1/';
  currentFriends:Friend[];
  constructor(private http: HttpClient) { }


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

}
