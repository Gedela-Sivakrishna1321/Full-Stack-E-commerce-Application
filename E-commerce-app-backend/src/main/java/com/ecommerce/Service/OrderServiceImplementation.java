package com.ecommerce.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Exceptions.OrderException;
import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Models.Address;
import com.ecommerce.Models.Cart;
import com.ecommerce.Models.CartItem;
import com.ecommerce.Models.OrderItem;
import com.ecommerce.Models.Orders;
import com.ecommerce.Models.User;
import com.ecommerce.Repository.AddressRepository;
import com.ecommerce.Repository.CartRepository;
import com.ecommerce.Repository.OrderItemRepository;
import com.ecommerce.Repository.OrdersRepository;
import com.ecommerce.Repository.UserRepository;

@Service
public class OrderServiceImplementation implements OrderService {

	@Autowired
	private OrdersRepository ordersRepository;
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OrderItemService orderItemService;
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Override
	public Orders createOrder(User user, Address shippingAddress) throws UserException {
		
		shippingAddress.setUser(user);
		Address address = addressRepository.save(shippingAddress);
		user.getAddress().add(address);
		userRepository.save(user);
		
		Cart cart = cartService.findUserCart(user.getId());
		List<OrderItem> orderItems = new ArrayList();
		
		for(CartItem Item : cart.getCartItems()) {
			
			OrderItem orderItem = new OrderItem();
			
			orderItem.setPrice(Item.getPrice());
			orderItem.setProduct(Item.getProduct());
			orderItem.setQuantity(Item.getQuantity());
			orderItem.setSize(Item.getSize());
			orderItem.setUserId(Item.getUserId());
			orderItem.setDiscountedPrice(Item.getDiscountedPrice());
			
			OrderItem createdOrderItem = orderItemRepository.save(orderItem);
			
			orderItems.add(createdOrderItem);
			
		}
		
		Orders createdOrder = new Orders();
		createdOrder.setUser(user);
		createdOrder.setOrderItems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setTotalItem(cart.getTotalItem());
		createdOrder.setShippingAddress(address);
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.getPaymentDetails().setStatus("PENDING");
		createdOrder.setCreatedAt(LocalDateTime.now());
		
		Orders savedOrder = ordersRepository.save(createdOrder);
		
		// To save the instance of savedOrder in each order Item
		for(OrderItem item : orderItems) {
			item.setOrder(savedOrder);
			orderItemRepository.save(item);
		}
		
		return savedOrder;
	}

	@Override
	public Orders findOrderById(Long orderId) throws OrderException {
		
		Optional<Orders> optional = ordersRepository.findById(orderId);
		
		if(optional.isPresent()) {
			return optional.get();
		}
		
		throw new OrderException("Order Not Found With Id - " + orderId);
	}

	@Override
	public List<Orders> usersOrderHistory(Long userId) {
	
		return ordersRepository.getUsersOrders(userId);
	}

	@Override
	public Orders placedOrder(Long orderId) throws OrderException {
		
		Orders order = findOrderById(orderId);
		order.setOrderStatus("PLACED");
		order.getPaymentDetails().setStatus("COMPLETED");
		
		return ordersRepository.save(order);
	}

	@Override
	public Orders confirmedOrder(Long orderId) throws OrderException {
		
		Orders order = findOrderById(orderId);
		order.setOrderStatus("CONFIRMED");
		
		return ordersRepository.save(order);
	}

	@Override
	public Orders shippedOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus("SHIPPED");
		
		return ordersRepository.save(order);
	}

	@Override
	public Orders deliveredOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus("DELIVERED");
		
		return ordersRepository.save(order);
	}

	@Override
	public Orders canceledOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus("CANCELLED");
		
		return ordersRepository.save(order);
	}

	@Override
	public List<Orders> getAllOrders() {
		List<Orders> orders = ordersRepository.findAll();
		return orders;
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		
		ordersRepository.deleteById(orderId);
		
	}

//	@Override
//	public Orders findUserOrders(User user) throws UserException {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
