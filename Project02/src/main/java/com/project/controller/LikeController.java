package com.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.exception.ResourceNotFoundException;
import com.project.model.Like;
import com.project.model.Restaurant;
import com.project.model.User;
import com.project.repository.LikeRepository;
import com.project.service.LikeService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class LikeController {
	
	@Autowired
	private LikeRepository likeRepo;

	@Autowired
	LikeService likeService;

	// get all likes
	@GetMapping("/likes")
	public List<Like> getAllLikes() {
		return likeRepo.findAll();
	}

	// get like by id
	@GetMapping("/likes/{id}")
	public ResponseEntity<Like> getLikeById(@PathVariable(value = "id") Long likeId) throws ResourceNotFoundException {

		Like like = likeRepo.findById(likeId)
				.orElseThrow(() -> new ResourceNotFoundException("Like not found for this id :: " + likeId));
		return ResponseEntity.ok().body(like);
	}

	// create like
	@RequestMapping(value = "/{userId}/likes", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Like createLike(@PathVariable(value = "userId") Long userId, @RequestBody Like like)
			throws ResourceNotFoundException {
		return likeService.createLike(userId, like);
	}

	// update is_like
	@PatchMapping("/likes/{id}")
	public ResponseEntity<Like> updateLike(@PathVariable(value = "id") Long likeId, @Valid @RequestBody Like likeDetail)
			throws ResourceNotFoundException {
		Like like = likeRepo.findById(likeId)
				.orElseThrow(() -> new ResourceNotFoundException("like not found for this id :: " + likeId));
		like.setIs_liked(likeDetail.getIs_liked());
		final Like updatedLike = likeRepo.save(like);
		return ResponseEntity.ok(updatedLike);
	}

	// delete a like
	@DeleteMapping("/likes/{id}")
	public Map<String, Boolean> deleteLike(@PathVariable(value = "id") Long likeId) throws ResourceNotFoundException {
		Like like = likeRepo.findById(likeId)
				.orElseThrow(() -> new ResourceNotFoundException("Like object not found for this id :: " + likeId));
		likeRepo.delete(like);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}


	// match likes
	@PostMapping("/getMatch")
	public List<Long> getMatch(@RequestBody Like like, @RequestBody User user, @RequestBody Long friendId) throws ResourceNotFoundException {
		likeService.createLike(user.getId(), like);
		List<Long> matchList = likeService.getMatching(user, friendId);
		return matchList;
	}
}
