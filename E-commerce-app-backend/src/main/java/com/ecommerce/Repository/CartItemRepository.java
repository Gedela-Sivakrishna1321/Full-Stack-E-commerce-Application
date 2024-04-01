package com.ecommerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.Models.Cart;
import com.ecommerce.Models.CartItem;
import com.ecommerce.Models.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	@Query("SELECT ci FROM CartItem ci Where ci.cart = :cart And ci.product = :product And ci.size = :size And ci.userId=:userId")
	public CartItem isCartItemExist(@Param("cart") Cart cart, @Param("product") Product product, @Param("size") String size
			, @Param("userId") Long userId);

}
