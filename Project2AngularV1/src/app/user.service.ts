import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginComponent} from './login/login.component';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'http://localhost:9090/api/v1/users';
  currentUser:User;

  constructor(private http: HttpClient) { }
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  patchUser(id: number, value: any): Observable<Object> {
    return this.http.patch(`${this.baseUrl}/${id}`, value);
  }

  deleteUserLikes(id: number){
    return this.http.delete(`${this.baseUrl}/${id}/likes`)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  saveUserToSession(user:User){
    this.currentUser=user;
  }
  showUserInSession(){
    return this.currentUser;
  }

}
