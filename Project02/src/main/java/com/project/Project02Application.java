package com.project;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpringBootApplication
public class Project02Application {
    
private static final Logger logger=LogManager.getLogger(Project02Application.class);
	public static void main(String[] args) {
		logger.info("Started Application- logger message");
		
	SpringApplication.run(Project02Application.class, args);
		logger.info("Ending Application- logger message");
 
	}

}
