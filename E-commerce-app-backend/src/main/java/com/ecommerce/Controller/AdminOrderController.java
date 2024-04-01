package com.ecommerce.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Exceptions.OrderException;
import com.ecommerce.Models.Orders;
import com.ecommerce.Response.ApiResponse;
import com.ecommerce.Service.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminOrderController {

	@Autowired(required = true)
	private OrderService orderService;
	
	@GetMapping("/")
	public ResponseEntity<List<Orders>> getAllOrdersHandler() {
		List<Orders> orders = orderService.getAllOrders();
		return new ResponseEntity<List<Orders>>(orders, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/confirmed")
	public ResponseEntity<Orders> ConfirmedOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		Orders confirmedOrder = orderService.confirmedOrder(orderId);
		return new ResponseEntity<Orders>(confirmedOrder, HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/ship")
	public ResponseEntity<Orders> ShippedOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		Orders Order = orderService.shippedOrder(orderId);
		return new ResponseEntity<Orders>(Order, HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/deliver")
	public ResponseEntity<Orders> DeliverOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		Orders Order = orderService.deliveredOrder(orderId);
		return new ResponseEntity<Orders>(Order, HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Orders> CancelOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		Orders Order = orderService.canceledOrder(orderId);
		return new ResponseEntity<Orders>(Order, HttpStatus.OK);
	}
	
	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponse> DeleteOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
			
		orderService.deleteOrder(orderId);
			
			ApiResponse response = new ApiResponse();
			response.setMessage("Order Deleted Successfully ");
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
}
