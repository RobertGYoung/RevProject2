package com.project.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.Like;
import com.project.model.User;
import com.project.repository.LikeRepository;
import com.project.repository.UserRepository;
import com.project.exception.ResourceNotFoundException;


@RestController 
@CrossOrigin(origins = "*")	
@RequestMapping("/api/v1")
public class UserController {

	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private LikeRepository likeRepo;
	
	@PostConstruct
	public void initDatabaseValues() {
		System.out.println("Initializing default database values");
		if(userRepo.count()==0) {
			//If any default like or friend objects they should also be done here.
			User u1 = new User("Ezra", "password", "Denver");
			User u2 = new User("Emily", "password", "Denver");
			User u3 = new User("Admin", "pass", "Herndon");
			User u4 = new User("Friend", "pass", "Herndon");
			userRepo.save(u1);
			userRepo.save(u2);
			userRepo.save(u3);
			userRepo.save(u4);
			userRepo.flush();
		}
	}
	
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
	
	@DeleteMapping("/users/{id}/likes")
	public ResponseEntity<User> deleteLikeByUser(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException{
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));
		likeRepo.deleteByUser(user);
		Set<Like> likes= user.getLikes();
		likes.clear();
		user.setLikes(likes);
		final User updatedUser = userRepo.saveAndFlush(user);
		return ResponseEntity.ok(updatedUser);
	}
	
	// update user
	@PatchMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody User userDetail)
			throws ResourceNotFoundException {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));
		user.setPassword(userDetail.getPassword());
		final User updatedUser = userRepo.save(user);
		return ResponseEntity.ok(updatedUser);
	}
}
