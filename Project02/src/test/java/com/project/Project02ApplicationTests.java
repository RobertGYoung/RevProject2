package com.project;

import static org.junit.Assert.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.project.model.User;
import com.project.repository.UserRepository;


@RunWith(SpringRunner.class)
@DataJpaTest
class Project02ApplicationTests {

   @Autowired
    private TestEntityManager entityManager;
 
    @Autowired
    private UserRepository userRepository;

	@Test
	void trueTest() {
		assertTrue(true);
	}
	
	@Test
	public void whenFindByName_thenReturnEmployee() {
	    // given
	    User dummy = new User("Name", "password", "loaction");
	    entityManager.persist(dummy);
	    entityManager.flush();
	 
	    // when
	    User found = userRepository.findById(dummy.getId()).get();
	    
	    // then
	    assertTrue(found.getId() == dummy.getId());
	}
}
