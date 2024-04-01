package com.ecommerce.Controller;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Models.Cart;
import com.ecommerce.Models.User;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.Request.LoginRequest;
import com.ecommerce.Response.ApiResponse;
import com.ecommerce.Response.AuthResponse;
import com.ecommerce.Service.CartService;
import com.ecommerce.Service.CustomUserServiceImplementation;
import com.ecommerce.config.JwtProvider;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private CustomUserServiceImplementation customUserServiceImplementation;
	@Autowired
	private CartService cartService;
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
		
		String email = user.getEmail();
		String password = user.getPassword();
		String firstName = user.getFirstName();
		String lastName = user.getLastName();
		
		User isEmailExist = userRepository.findByEmail(email);
		
		if(isEmailExist != null) {
			throw new UserException("user already exist with email - " + email);
		}
		
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFirstName(firstName);
		createdUser.setLastName(lastName);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setCreatedAt(LocalDateTime.now());
//		createdUser.getRole().add("USER")
		
		User savedUser = userRepository.save(createdUser);
		Cart cart = cartService.createCart(savedUser);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, savedUser.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtProvider.generateToken(authentication);
		

		AuthResponse response = new AuthResponse(token, "Sign up successfull");
		
		return new ResponseEntity<AuthResponse>(response, HttpStatus.CREATED);
		
		
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
		
		String email = loginRequest.getEmail();
		String password = loginRequest.getPassword();
		
		Authentication authentication = authenticate(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtProvider.generateToken(authentication);
		
		AuthResponse response = new AuthResponse(token, "Sign in successfull");
		
		return new ResponseEntity<AuthResponse>(response, HttpStatus.CREATED);
		
	}
	
	public Authentication authenticate(String email, String password) {
		
		UserDetails userDetails = customUserServiceImplementation.loadUserByUsername(email);
		
		if(userDetails == null) {
			throw new BadCredentialsException("user not found with email - " + email);
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password ..!");
		}
		
		return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
	}
}
