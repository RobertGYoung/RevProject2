package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.MailUser;
import com.project.service.MailService;

@RestController
@CrossOrigin(origins = "*")
public class MailController {

	@Autowired
	private MailService sendMail;
	
	@Autowired
	private MailUser user;
	
	@RequestMapping(value="send-mail", method = RequestMethod.POST)
	public String send(@RequestParam(value="email_", required=false)  String userEmail) {
		sendMail.setMailText("http://localhost:4200/passwordreset");
		user.setEmailAddress(userEmail);  //Receiver's email address
		System.out.println(userEmail);
		try {
			sendMail.sendEmail(user);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
		return "Mail sent sucessfull.";
	}
	
	
}
