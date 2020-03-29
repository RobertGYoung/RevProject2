package com.project.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.model.*;
@Repository
public interface LikeRepository extends JpaRepository<Like, Long>{
	@Transactional
	@Modifying
	@Query("Delete Like where user=:user")
	public void deleteByUser(User user);
}