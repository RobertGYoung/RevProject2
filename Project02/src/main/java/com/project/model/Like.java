package com.project.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "project_like")
public class Like {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long r_id;
	private Boolean isLiked;
	private long u_id;

	@ManyToOne
	@JoinColumn
	private User user;
	public Like() {
	}

	public Like(long u_id, long r_id, Boolean isLiked) {
	
		this.u_id = u_id;
		this.r_id = r_id;
		this.isLiked = isLiked;
	}

	@Column
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "u_id", nullable = false)
	public long getU_id() {
		return u_id;
	}

	public void setU_id(long u_id) {
		this.u_id = u_id;
	}

	@Column(name = "r_id", nullable = false)

	public long getR_id() {
		return r_id;
	}

	public void setR_id(long r_id) {
		this.r_id = r_id;
	}

	@Column(name = "isLiked", nullable = false)

	public Boolean getIsLiked() {
		return isLiked;
	}

	public void setIsLiked(Boolean isLiked) {
		this.isLiked = isLiked;
	}

	@Override
	public String toString() {
		return "Like [id=" + id + ", r_id=" + r_id + ", isLiked=" + isLiked + ", u_id=" + u_id + "]";
	}




}