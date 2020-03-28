package com.project;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.project.model.Like;
import com.project.model.Restaurant;
import com.project.model.User;
import com.project.repository.LikeRepository;
import com.project.repository.RestaurantRepository;
import com.project.repository.UserRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
class Project02ApplicationTests {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private RestaurantRepository restRepo;

	@AfterEach
	public void teardown() {
		System.out.println("Teardown");
		entityManager.clear();
	}

	@BeforeEach
	public void setUp() {

		System.out.println("Setup");
		User u1 = new User("John", "john", "here");
		User u2 = new User("Sally", "sally", "there");
		Like l1 = new Like(u1, 1, true);
		Like l2 = new Like(u1, 1, false);
		Restaurant r1 = new Restaurant();
		r1.setLocation("Denver");
		Restaurant r2 = new Restaurant();
		entityManager.persistAndFlush(r1);
		entityManager.persistAndFlush(r2);
		entityManager.persistAndFlush(u1);
		entityManager.persistAndFlush(u2);
		entityManager.persistAndFlush(l1);
		entityManager.persistAndFlush(l2);
	}

	@Test
	public void putAndFetchTest() {
		// given
		User dummy = new User("Name", "password", "loaction");
		entityManager.persist(dummy);
		entityManager.flush();

		// when
		User found = userRepository.findById(dummy.getId()).get();

		// then
		assertTrue(found.getId() == dummy.getId());

	}

	@Test
	public void userFetchAllTest() {
		List<User> users = userRepository.findAll();
		System.out.println(users);
		assertTrue(users.size() == 2);
	}

	@Test
	public void likeFetchAllTest() {
		List<Like> likes = likeRepository.findAll();
		assertTrue(likes.size() == 2);
	}

	@Test
	public void userUpdateTest() {
		User user = userRepository.findAll().get(0);
		user.setLocation("Otherplace");
		user = userRepository.save(user);
		userRepository.flush();

		assertTrue(user.getLocation().equals("Otherplace"));
	}

	/*
	 * @Test public void userDeleteTest() { User u =
	 * userRepository.findAll().get(0); userRepository.delete(u);
	 * userRepository.flush(); assertTrue(userRepository.count() ==1); }
	 */
	
	@Test
	public void userCreateTest() {
		User user = new User("newPerson", "newPassword", "place");
		userRepository.save(user);
		userRepository.flush();

		assertTrue(userRepository.count() == 3);
	}
	
	@Test
	public void RestaurantbyLocationTest() {
		System.out.println("Denver");
		List<Restaurant> restaurants=  restRepo.byLocation("Denver");
		System.out.println(restaurants);
		assertTrue(restaurants.size()==1);
	}
}
