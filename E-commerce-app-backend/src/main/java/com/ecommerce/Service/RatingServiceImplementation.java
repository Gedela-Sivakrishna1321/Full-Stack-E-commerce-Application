package com.ecommerce.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Models.Product;
import com.ecommerce.Models.Rating;
import com.ecommerce.Models.User;
import com.ecommerce.Repository.RatingRepository;
import com.ecommerce.Request.RatingRequest;

@Service
public class RatingServiceImplementation implements RatingService {
	
	@Autowired
	private RatingRepository ratingRepository;
	@Autowired
	private ProductService productService;
	
	@Override
	public Rating createRating(RatingRequest req, User user) throws ProductException {
		
		Product product = productService.findProductById(req.getProductId());
		
		Rating rating = new Rating();
		rating.setProduct(product);
		rating.setRating(req.getRating());
		rating.setUser(user);
		rating.setCreatedAt(LocalDateTime.now());
		
		return ratingRepository.save(rating);
	}

	@Override
	public List<Rating> getProductRatings(Long productId) {
		
		return ratingRepository.findAllProductRatings(productId);
	}

}
