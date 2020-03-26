package com.project.model;

import org.springframework.stereotype.Component;

@Component
public class MailUser {
	
	private String emailAddress;
	
	public MailUser() {
		super();
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

}