import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:9090/api/v1/restaurants';
  currentRestaurant:Restaurant;
  
  constructor(private http: HttpClient) { }
  getRestaurant(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRestaurantList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  saveRestaurantToSession(restaurant:Restaurant){
    this.currentRestaurant=restaurant;
  }
  showUserInSession(){
    return this.currentRestaurant;
  }
}
