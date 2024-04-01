package com.ecommerce.Service;

import java.util.List;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Models.Rating;
import com.ecommerce.Models.User;
import com.ecommerce.Request.RatingRequest;

public interface RatingService {
	
	public Rating createRating(RatingRequest req, User user) throws ProductException;
	public List<Rating> getProductRatings(Long productId);
	
}
