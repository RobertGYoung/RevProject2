package com.project.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.exception.ResourceNotFoundException;
import com.project.model.FriendList;
import com.project.model.User;
import com.project.repository.FriendListRepository;
import com.project.repository.UserRepository;
@Service
public class FriendListService {
	
	@Autowired
	private FriendListRepository friendRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public FriendList createFriend(long userId, FriendList friend) throws ResourceNotFoundException {
		
		Set<FriendList> friends = new HashSet<>();
		Optional<User> userById = userRepo.findById(userId);
		 if (!userById.isPresent()) {
	            throw new ResourceNotFoundException("User with this id  does not exist");
	        }
		 User user = userById.get();
		 friend.setUser(user);
		 
		 FriendList friend1 = friendRepo.save(friend);
		 
		 friends.add(friend1);
		 
		return friend1;
	}

}