package com.project.controller;

import java.util.List;

import javax.annotation.PostConstruct;
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

	@PostConstruct
	public void initDatabaseValues() {
		if(restaurantRepo.count()==0) {
			Restaurant r1 = new Restaurant("Rio Grande", "Denver", "pass", "pass" );
			Restaurant r2 = new Restaurant("Illegal Petes", "Denver", "pass", "pass");
			Restaurant r3 = new Restaurant("Cho77", "Denver", "pass", "pass");
			restaurantRepo.save(r1);
			restaurantRepo.save(r2);
			restaurantRepo.save(r3);
			restaurantRepo.flush();
		}
	}
	
	@GetMapping("/restaurants")
	public List<Restaurant> getAllrestaurants() {
		return restaurantRepo.findAll();
	}

	@PostMapping("/restaurants")
	public Restaurant createrestaurant(@Valid @RequestBody Restaurant restaurant) {
		return restaurantRepo.save(restaurant);
	}

	@GetMapping("/restaurants/{id}")
	public ResponseEntity<Restaurant> getRestaurantById(@PathVariable(value = "id") Long restaurantId)
			throws ResourceNotFoundException {
		Restaurant restaurant = restaurantRepo.findById(restaurantId).orElseThrow(
				() -> new ResourceNotFoundException("Restaurant not found for this id :: " + restaurantId));
		return ResponseEntity.ok().body(restaurant);
	}

	@GetMapping("/restaurantsAt/{location}")
	public List<Restaurant> getRestaurantbyLocation(@PathVariable(value = "location") String location) {
		return restaurantRepo.byLocation(location);
	}
}
