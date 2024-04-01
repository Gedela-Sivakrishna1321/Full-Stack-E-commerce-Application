package com.ecommerce.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Models.Review;
import com.ecommerce.Models.User;
import com.ecommerce.Request.ReviewRequest;
import com.ecommerce.Service.ReviewService;
import com.ecommerce.Service.UserService;

@RestController
@RequestMapping("/api/reviews")
//@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<Review> createReview(@RequestBody ReviewRequest req, 
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		Review review = reviewService.createReview(req, user);
		
		return new ResponseEntity<Review>(review, HttpStatus.OK);
	}

	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId, 
			@RequestHeader("Authorization") String jwt) throws UserException {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Review> reviews = reviewService.getAllProductReviews(productId);
		
		return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
	}
}
