package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.project.model.MailUser;

@Service
public class MailService {

	private JavaMailSender javaMailSender;
	private String mailText =" Link";
	
	public String getMailText() {
		return mailText;
	}


	public void setMailText(String mailText) {
		this.mailText = mailText;
	}


	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	
	public void sendEmail(MailUser user) throws MailException {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(user.getEmailAddress());
		mail.setSubject("Reset Password");
		mail.setText("Password Rest Link: "+mailText);
		javaMailSender.send(mail);
	}

}
