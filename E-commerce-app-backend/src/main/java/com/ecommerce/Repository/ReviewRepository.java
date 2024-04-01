package com.ecommerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.Models.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	@Query("Select r from Review r Where r.product.id=:productId")
	public List<Review> findAllProductReviews(@Param("productId") Long productId);
}
