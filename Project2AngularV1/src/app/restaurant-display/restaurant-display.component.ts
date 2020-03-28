import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../restaurant';
import {RestaurantService} from '../restaurant.service'
@Component({
  selector: 'app-restaurant-display',
  templateUrl: './restaurant-display.component.html',
  styleUrls: ['./restaurant-display.component.css']
})
export class RestaurantDisplayComponent implements OnInit {

  constructor(private restaurantService:RestaurantService) { }

  currentIndex: number = 0;
  restaurant:Restaurant;
  restaurants;
  

  ngOnInit(): void {
    this.restaurants= this.restaurantService.getRestaurantList().subscribe();
    console.log(this.restaurants);
  }
  clickNext(){
    if(this.currentIndex < this.restaurants.length)
    this.currentIndex++;
    console.log("ckicl")
  }
  clickPrev(){
    if(this.currentIndex > 0){
      this.currentIndex--;
    }
  }
}
