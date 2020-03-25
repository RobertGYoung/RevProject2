package com.project.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "project_like")
public class Like {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long r_id;
	private boolean is_liked;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_id")
	private User user;

	public Like() {
	}

	public Like(User user, long r_id, Boolean isLiked) {
	
		this.user = user;
		this.r_id = r_id;
		this.is_liked = isLiked;
	}

	@Column
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "r_id", nullable = false)

	public long getR_id() {
		return r_id;
	}

	public void setR_id(long r_id) {
		this.r_id = r_id;
	}

	@Column(name = "is_liked", nullable = false)

	public boolean getIs_liked() {
		return is_liked;
	}

	public void setIs_liked(boolean is_liked) {
		this.is_liked = is_liked;
	}

	public long getUserId() {
		return user.getId();
	}

	@JsonIgnore
	public User getUser() {
		return user;
	}

	@JsonIgnore
	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Like [id=" + id + ", r_id=" + r_id + ", is_Liked=" + is_liked + ", user=" + user + "]";
	}
}