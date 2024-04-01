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

import com.ecommerce.Exceptions.OrderException;
import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Models.Address;
import com.ecommerce.Models.Orders;
import com.ecommerce.Models.User;
import com.ecommerce.Service.OrderService;
import com.ecommerce.Service.UserService;

@RestController
@RequestMapping("/api/orders")
//@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	@Autowired
	private UserService userService;
	
	@PostMapping("/")
	public ResponseEntity<Orders> createOrder(@RequestBody Address shippingAddress, 
			@RequestHeader("Authorization") String jwt) throws UserException {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		Orders order = orderService.createOrder(user, shippingAddress);
		System.out.println("Order - " + order);
		return new ResponseEntity<Orders>(order, HttpStatus.CREATED);
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<Orders>> usersOrderHistory(@RequestHeader("Authorization") String jwt ) throws UserException {
		
		User user = userService.findUserProfileByJwt(jwt);
		System.out.println(user.toString());
		List<Orders> orders = orderService.usersOrderHistory(user.getId());
		System.out.println("Fetched user orders successfully -- : )");
		return new ResponseEntity<List<Orders>>(orders, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Orders> findOrderById(@PathVariable("id") Long id,
			@RequestHeader("Authorization") String jwt) throws UserException, OrderException {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		Orders order = orderService.findOrderById(id);
		
		return new ResponseEntity<Orders>(order, HttpStatus.OK);
	}
}
