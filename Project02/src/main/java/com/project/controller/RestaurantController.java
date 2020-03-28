package com.project.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.exception.ResourceNotFoundException;
import com.project.model.Restaurant;
import com.project.repository.RestaurantRepository;

@RestController 
@CrossOrigin(origins = "*")	
@RequestMapping("/api/v1")
public class RestaurantController {
	
	@Autowired
	private RestaurantRepository restaurantRepo;
	
	@GetMapping("/restaurants")
	public List<Restaurant> getAllrestaurants(){
		return restaurantRepo.findAll();
	}
	
	@PostMapping("/restaurants")
	public Restaurant createrestaurant(@Valid @RequestBody Restaurant restaurant) {	
		return restaurantRepo.save(restaurant);
	}
	
	@GetMapping("/restaurants/{id}")
	public ResponseEntity<Restaurant> getRestaurantById(@PathVariable(value="id") Long restaurantId) throws ResourceNotFoundException{
		Restaurant restaurant = restaurantRepo.findById(restaurantId) .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found for this id :: " + restaurantId));
		return ResponseEntity.ok().body(restaurant);
	}
	
	@GetMapping("/restaurantsAt/{location}")
	public List<Restaurant> getRestaurantbyLocation(@PathVariable(value="location") String location){
		return restaurantRepo.byLocation(location);
	}
}
