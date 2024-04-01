package com.ecommerce.Request;

public class ReviewRequest {
	
	Long productId;
	String review;
	
	public Long getProductId() {
		return productId;
	}
	public String getReview() {
		return review;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public void setReview(String review) {
		this.review = review;
	}
	
	

}
