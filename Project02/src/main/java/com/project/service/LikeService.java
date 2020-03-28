package com.project.service;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
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

	public List<Long> getMatching(User user1, Long friend_id) {
		Set<Long> temp = new HashSet<Long>();
		List<Long> results = new LinkedList<Long>();
		Optional<User> Ouser = userRepo.findById(friend_id);
		if (Ouser.isPresent()) {
			User user2 = Ouser.get();
			// Add all the liked results to the hash set
			for (Like l : user1.getLikes()) {
				if (l.getIs_liked()) {
					temp.add(l.getR_id());
				}
			}
			// If a value is already in a set it returns false.
			for (Like l : user2.getLikes()) {
				if (l.getIs_liked())
					if (!temp.add(l.getR_id()))
						results.add(l.getR_id());
			}
		}
		return results;
	}
}
