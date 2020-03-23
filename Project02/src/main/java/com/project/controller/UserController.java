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

import com.project.model.User;
import com.project.repository.UserRepository;
import com.project.exception.ResourceNotFoundException;


@RestController 
@CrossOrigin(origins = "*")	
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	private UserRepository userRepo;
	
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userRepo.findAll();
	}
	
	@PostMapping("/users")
	public User createUser(@Valid @RequestBody User user) {
		return userRepo.save(user);
	}
	
	
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable(value="id") Long userId) throws ResourceNotFoundException{
		
		User user = userRepo.findById(userId) .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));
		
        return ResponseEntity.ok().body(user);

	}

}
