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
			Restaurant r1 = new Restaurant("Rio Grande", "Denver", "https://riograndemexican.com/locations/denver/?utm_source=Yext&utm_medium=Local_Listings&utm_campaign=Denver", "https://rest-bucket.s3.amazonaws.com/rio.jpg" );
			Restaurant r2 = new Restaurant("Illegal Petes", "Denver", "https://www.illegalpetes.com/", "https://rest-bucket.s3.amazonaws.com/Petesjpg.jpg");
			Restaurant r3 = new Restaurant("Cho77", "Denver", "https://www.cho77.com/", "https://rest-bucket.s3.amazonaws.com/cho77.jpg");
			Restaurant r4 = new Restaurant("Chicken Rico", "Herndon", "https://menupages.com/chicken-rico/1254-elden-st-herndon", "https://rest-bucket.s3.amazonaws.com/chicken-rico.jpg");
			Restaurant r5 = new Restaurant("Hama Sushi", "Herndon", "http://www.hama-sushi.com/", "https://rest-bucket.s3.amazonaws.com/Hama-.jpg");
			Restaurant r6 = new Restaurant("Kalpasi", "Herndon", "https://www.kalpasi.com/", "https://rest-bucket.s3.amazonaws.com/kalpasi.jpg");
			Restaurant r7 = new Restaurant("Thai tada", "Herndon", "https://www.thaitada.com/", "https://rest-bucket.s3.amazonaws.com/thaitada.jpg");
			Restaurant r8 = new Restaurant("Alo Vietnam", "Herndon", "https://www.alovndulles.com/", "https://rest-bucket.s3.amazonaws.com/alov.jpg");
			Restaurant r9 = new Restaurant("Popeyes", "Herndon", "https://www.popeyes.com/store-locator/store/restaurant_82447", "https://rest-bucket.s3.amazonaws.com/popeyes.jpg");

			
			
			restaurantRepo.save(r1);
			restaurantRepo.save(r2);
			restaurantRepo.save(r3);
			restaurantRepo.save(r4);
			restaurantRepo.save(r5);
			restaurantRepo.save(r6);
			restaurantRepo.save(r7);
			restaurantRepo.save(r8);
			restaurantRepo.save(r9);
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
