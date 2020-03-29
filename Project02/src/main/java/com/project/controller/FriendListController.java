package com.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.exception.ResourceNotFoundException;
import com.project.model.FriendList;
import com.project.model.Like;
import com.project.repository.FriendListRepository;
import com.project.service.FriendListService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class FriendListController {

	@Autowired
	private FriendListRepository friendRepo;

	@Autowired
	private FriendListService friendService;

	// get all friends
	@GetMapping("/friends")
	public List<FriendList> getAllFriends() {
		return friendRepo.findAll();
	}

	// get like by id
	@GetMapping("/friends/{id}")
	public ResponseEntity<FriendList> getFriendById(@PathVariable(value = "id") Long friendId)
			throws ResourceNotFoundException {

		FriendList friend = friendRepo.findById(friendId)
				.orElseThrow(() -> new ResourceNotFoundException("Friend not found for this id :: " + friendId));
		return ResponseEntity.ok().body(friend);
	}

	// create a friend
	@RequestMapping(value = "/{userId}/friends", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public FriendList createFriend(@PathVariable(value = "userId") Long userId, @RequestBody FriendList friend)
			throws ResourceNotFoundException {
			return friendService.createFriend(userId, friend);
	}

	// delete a like
	@DeleteMapping("/friend/{id}")
	public Map<String, Boolean> deleteFriendList(@PathVariable(value = "id") Long friendId)
			throws ResourceNotFoundException {
		FriendList friend = friendRepo.findById(friendId)
				.orElseThrow(() -> new ResourceNotFoundException("Like object not found for this id :: " + friendId));
		friendRepo.delete(friend);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

}
