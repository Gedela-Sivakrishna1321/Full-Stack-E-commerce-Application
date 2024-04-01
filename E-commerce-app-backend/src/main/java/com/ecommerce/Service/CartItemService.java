package com.ecommerce.Service;

import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Exceptions.cartItemException;
import com.ecommerce.Models.Cart;
import com.ecommerce.Models.CartItem;
import com.ecommerce.Models.Product;

public interface CartItemService {
	
	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws cartItemException, UserException;
	
	public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);
	
	public void removeCartItem(Long userId, Long cartItemId) throws cartItemException, UserException;
	
	public CartItem findCartItemById(Long cartItemId) throws cartItemException;

}
