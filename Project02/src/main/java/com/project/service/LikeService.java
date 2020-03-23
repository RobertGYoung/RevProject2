package com.project.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.exception.ResourceNotFoundException;
import com.project.model.Like;
import com.project.model.User;
import com.project.repository.LikeRepository;
import com.project.repository.UserRepository;
@Service
public class LikeService {
	
	@Autowired
	private LikeRepository likeRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public Like createLike(long userId, Like like) throws ResourceNotFoundException {
		Set<Like> likes = new HashSet<>();
		Optional<User> userById = userRepo.findById(userId);
		 if (!userById.isPresent()) {
	            throw new ResourceNotFoundException("User with this id  does not exist");
	        }
		 
		 User user = userById.get();
		 like.setUser(user);
		 
		 Like like1 = likeRepo.save(like);
		 
		 likes.add(like1);
		 
		return like1;
	}

}
