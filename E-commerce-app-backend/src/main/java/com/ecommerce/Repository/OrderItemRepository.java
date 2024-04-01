package com.ecommerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.Models.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
