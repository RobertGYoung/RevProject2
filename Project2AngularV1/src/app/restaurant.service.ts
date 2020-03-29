import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:9090/api/v1/restaurants';
  currentRestaurants:Restaurant[];

  constructor(private http: HttpClient) { }
  getRestaurant(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRestaurantListByLocation(location:String): Observable<any> {
    return this.http.get(`${this.baseUrl}At/${location}`);
  }

  getRestaurantList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  saveRestaurantsToSession(restaurants:Restaurant[]){
    this.currentRestaurants=restaurants;
  }
  showRestaurantsInSession(){
    return this.currentRestaurants;
  }
}
