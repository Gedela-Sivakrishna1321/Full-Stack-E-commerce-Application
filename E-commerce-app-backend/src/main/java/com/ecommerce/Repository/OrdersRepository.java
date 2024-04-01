package com.ecommerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.Models.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

	@Query("SELECT o FROM Orders o WHERE o.user.id = :userId AND (o.orderStatus = 'PENDING' OR o.orderStatus = 'PLACED' OR o.orderStatus = 'CONFIRMED' OR o.orderStatus = 'SHIPPED' OR o.orderStatus = 'DELIVERED') ")
	public List<Orders> getUsersOrders(@Param("userId") Long userId); 
}
