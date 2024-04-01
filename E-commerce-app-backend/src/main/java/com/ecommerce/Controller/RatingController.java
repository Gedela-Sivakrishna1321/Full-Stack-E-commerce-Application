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
import com.ecommerce.Models.Rating;
import com.ecommerce.Models.User;
import com.ecommerce.Request.RatingRequest;
import com.ecommerce.Service.RatingService;
import com.ecommerce.Service.UserService;

@RestController
@RequestMapping("/api/ratings")
//@CrossOrigin(origins = "http://localhost:3000")
public class RatingController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private RatingService ratingService;
	
	@PostMapping("/create")
	public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req, 
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		Rating rating = ratingService.createRating(req, user);
		
		return new ResponseEntity<Rating>(rating, HttpStatus.OK);
	}

	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Rating>> getProductRatings(@PathVariable Long productId, 
			@RequestHeader("Authorization") String jwt) throws UserException {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Rating> ratings = ratingService.getProductRatings(productId);
		
		return new ResponseEntity<List<Rating>>(ratings, HttpStatus.OK);
	}
}
