package com.project.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.project.model.*;
@Repository
public interface FriendListRepository extends JpaRepository<FriendList, Long>{
	@Query("From FriendList fl where fl.user=:user  and fl.f_id =:f_id")
	public Set<FriendList> getFriendUserPair(User user, Long f_id);
}
