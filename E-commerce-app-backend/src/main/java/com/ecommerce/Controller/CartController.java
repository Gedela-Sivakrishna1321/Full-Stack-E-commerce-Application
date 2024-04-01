package com.ecommerce.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Exceptions.cartItemException;
import com.ecommerce.Models.Cart;
import com.ecommerce.Models.User;
import com.ecommerce.Request.AddItemRequest;
import com.ecommerce.Response.ApiResponse;
import com.ecommerce.Service.CartItemService;
import com.ecommerce.Service.CartService;
import com.ecommerce.Service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	@Autowired
	private CartService cartService;
	@Autowired
	private UserService userService;
	@Autowired
	private CartItemService cartItemService;
	
	@GetMapping("/")
	public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException {
		
		User user = userService.findUserProfileByJwt(jwt);
		Cart cart = cartService.findUserCart(user.getId());
		System.out.println("User Cart - "+ cart.toString());
		return new ResponseEntity<Cart>(cart, HttpStatus.OK);
	}

	@PutMapping("/add")
	public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException {
		
		User user = userService.findUserProfileByJwt(jwt);
		System.out.println("Hello -- >");
		cartService.addCartItem(user.getId(), req);
		
		ApiResponse response = new ApiResponse();
		response.setMessage("Item Added to cart successfully");
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
// --> This is implemented in CartItemController	
//	@DeleteMapping("/cart_item/remove/{id}")
//	public ResponseEntity<ApiResponse> removeItemFromCart(@PathVariable Long id,
//			@RequestHeader("Authorization") String jwt) throws UserException, cartItemException {
//		
//		User user = userService.findUserProfileByJwt(jwt);
//		cartItemService.removeCartItem(user.getId() , id);
//		
//		System.out.println("Item Removed From Cart with id - " + id);
//		
//		ApiResponse response = new ApiResponse();
//		response.setMessage("Item Removed From Cart Successfully !");
//		
//		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
//		
//	}
}
