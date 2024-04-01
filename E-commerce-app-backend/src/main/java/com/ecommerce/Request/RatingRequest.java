package com.ecommerce.Request;

public class RatingRequest {
	
	Long productId;
	double rating;
	
	public Long getProductId() {
		return productId;
	}
	public double getRating() {
		return rating;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	
	

}
