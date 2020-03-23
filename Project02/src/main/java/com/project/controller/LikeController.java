package com.project.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.Like;
import com.project.repository.LikeRepository;

@RestController 
@CrossOrigin(origins = "*")	
@RequestMapping("/api/v1")
public class LikeController {

	@Autowired
	private LikeRepository likeRepo;
	
	@GetMapping("/likes")
	public List<Like> getAllLikes(){
		return likeRepo.findAll();
	}
	
	@PostMapping("/likes")
	public Like createLike(@Valid @RequestBody Like like) {
		return likeRepo.save(like);
	}
	
	
	
}
