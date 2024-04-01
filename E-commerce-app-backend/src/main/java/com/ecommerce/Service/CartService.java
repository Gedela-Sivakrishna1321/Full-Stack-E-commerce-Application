package com.ecommerce.Service;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Models.Cart;
import com.ecommerce.Models.User;
import com.ecommerce.Request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId) throws UserException;

}
