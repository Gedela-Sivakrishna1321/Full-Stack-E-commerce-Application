package com.ecommerce.Models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Rating {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
	
	@Column(name = "rating")
	private double rating;
	
	
	private LocalDateTime createdAt;


	public Long getId() {
		return id;
	}


	public User getUser() {
		return user;
	}


	public Product getProduct() {
		return product;
	}


	public double getRating() {
		return rating;
	}


	public LocalDateTime getCreatedAt() {
		return createdAt;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public void setProduct(Product product) {
		this.product = product;
	}


	public void setRating(double rating) {
		this.rating = rating;
	}


	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
}
