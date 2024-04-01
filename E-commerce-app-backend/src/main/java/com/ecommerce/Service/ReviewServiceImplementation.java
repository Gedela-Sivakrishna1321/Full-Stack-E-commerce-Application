package com.ecommerce.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Models.Product;
import com.ecommerce.Models.Review;
import com.ecommerce.Models.User;
import com.ecommerce.Repository.ReviewRepository;
import com.ecommerce.Request.ReviewRequest;

@Service
public class ReviewServiceImplementation implements ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	@Autowired	
	private ProductService productService;

	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		
		Product product = productService.findProductById(req.getProductId());
		
		Review review = new Review();
		review.setProduct(product);
		review.setUser(user);
		review.setReview(req.getReview());
		review.setCreatedAt(LocalDateTime.now());
		
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllProductReviews(Long productId) {
		
		return reviewRepository.findAllProductReviews(productId);
	}

}
