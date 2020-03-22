package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.model.*;
@Repository
public interface LikeRepository extends JpaRepository<Like, Long>{
}