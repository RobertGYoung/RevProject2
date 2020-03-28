package com.project.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "project_restaurant")
public class Restaurant {

	private long id;
	private String name;
	private String location;
	private String web_url;
	private String image_url;

	public Restaurant() {
	}

	public Restaurant(String name, String location, String web_url, String image_url) {
		this.name = name;
		this.location = location;
		this.web_url = web_url;
		this.image_url = image_url;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column
	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	@Column(name = "image_url")
	public String getImage_url() {
		return image_url;
	}

	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}

	@Column(name = "web_url")
	public String getWeb_url() {
		return web_url;
	}

	public void setWeb_url(String webUrl) {
		this.web_url = webUrl;
	}

}
