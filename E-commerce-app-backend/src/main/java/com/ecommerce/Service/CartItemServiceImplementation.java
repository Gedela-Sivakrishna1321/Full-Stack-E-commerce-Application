package com.ecommerce.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Exceptions.cartItemException;
import com.ecommerce.Models.Cart;
import com.ecommerce.Models.CartItem;
import com.ecommerce.Models.Product;
import com.ecommerce.Models.User;
import com.ecommerce.Repository.CartItemRepository;
import com.ecommerce.Repository.CartRepository;

@Service
public class CartItemServiceImplementation implements CartItemService {
	
	@Autowired
	private CartItemRepository cartItemRepository;
	@Autowired
	private UserService userService;
	
	@Autowired
	@Lazy
	private CartService cartService;
//	@Autowired
//	private CartRepository cartRepository;

	@Override
	public CartItem createCartItem(CartItem cartItem) {
		
		cartItem.setQuantity(1);
		cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
		cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());
		
		CartItem createdCartItem = cartItemRepository.save(cartItem);
		
		return createdCartItem;
	}

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws cartItemException, UserException {
		
		CartItem item = findCartItemById(id);
		User user = userService.findUserById(item.getUserId());
		
		if(user.getId().equals(userId)) {
			item.setQuantity(cartItem.getQuantity());
			item.setPrice(item.getQuantity()*item.getProduct().getPrice());
			item.setDiscountedPrice(item.getQuantity()*item.getProduct().getDiscountedPrice());
		}
		
		return cartItemRepository.save(item);
	}

	@Override
	public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
		
		CartItem cartItem = cartItemRepository.isCartItemExist(cart, product, size, userId);
		
		return cartItem;
	}

	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws cartItemException, UserException {
		
		CartItem item = findCartItemById(cartItemId);
		
		User user = userService.findUserById(item.getUserId());
		
		User reqUser = userService.findUserById(userId);
		System.out.println("HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOo");
		if(user.getId().equals(reqUser.getId())) {
			Cart userCart = cartService.findUserCart(userId);
			userCart.getCartItems().remove(item);
//			cartItemRepository.deleteById(cartItemId);
			System.out.println("Item removed from cart successfully !");
		} else {
			throw new UserException("You cannot delete this item - " + reqUser.getId());
		}
		
	}

	@Override
	public CartItem findCartItemById(Long cartItemId) throws cartItemException {
		
		Optional<CartItem> optional = cartItemRepository.findById(cartItemId);
		
		if(optional.isPresent()) {
			return optional.get();
		}
		
		throw new cartItemException("Item not found with id - " + cartItemId);
	}

}
