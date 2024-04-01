package com.ecommerce.Service;

import java.util.List;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Models.Review;
import com.ecommerce.Models.User;
import com.ecommerce.Request.ReviewRequest;

public interface ReviewService {
	
	public Review createReview(ReviewRequest req, User user) throws ProductException;
	public List<Review> getAllProductReviews(Long productId);

}
