package com.ecommerce.Service;

import java.util.List;

import com.ecommerce.Exceptions.OrderException;
import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Models.Address;
import com.ecommerce.Models.Orders;
import com.ecommerce.Models.User;

public interface OrderService {
	
	public Orders createOrder(User user, Address shippingAddress) throws UserException;
	
	public Orders findOrderById(Long orderId) throws OrderException;
	
//	public Orders findUserOrders(User user) throws UserException;
	
	public List<Orders> usersOrderHistory(Long userId);
	
	public Orders placedOrder(Long orderId) throws OrderException;
	
	public Orders confirmedOrder(Long orderId) throws OrderException;
	
	public Orders shippedOrder(Long orderId) throws OrderException;
	
	public Orders deliveredOrder(Long orderId) throws OrderException;
	
	public Orders canceledOrder(Long orderId) throws OrderException;
	
	public List<Orders> getAllOrders();
	
	public void deleteOrder(Long orderId) throws OrderException;

}
