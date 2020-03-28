package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.project.model.*;
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
	@Query("From Restaurant R where R.location=:location")
	public List<Restaurant> byLocation(String location);
}