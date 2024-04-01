package com.ecommerce.Models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	@Column(name = "cart_items")
	private Set<CartItem> cartItems = new HashSet<>();
	
	@Column(name = "total_price")
	private double totalPrice;
	
	@Column(name = "total_item")
	private int totalItem;
	
	private int totalDiscountedPrice;
	
	private int discount;
	
	public Cart() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public User getUser() {
		return user;
	}

	public Set<CartItem> getCartItems() {
		return cartItems;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public int getTotalItem() {
		return totalItem;
	}

	public int getTotalDiscountedPrice() {
		return totalDiscountedPrice;
	}

	public int getDiscount() {
		return discount;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setCartItems(Set<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public void setTotalItem(int totalItem) {
		this.totalItem = totalItem;
	}

	public void setTotalDiscountedPrice(int totalDiscountedPrice) {
		this.totalDiscountedPrice = totalDiscountedPrice;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public Cart(Long id, User user, Set<CartItem> cartItems, double totalPrice, int totalItem, int totalDiscountedPrice,
			int discount) {
		super();
		this.id = id;
		this.user = user;
		this.cartItems = cartItems;
		this.totalPrice = totalPrice;
		this.totalItem = totalItem;
		this.totalDiscountedPrice = totalDiscountedPrice;
		this.discount = discount;
	}

	@Override
	public String toString() {
		return "Cart [id=" + id + ", user=" + user + ", cartItems=" + cartItems + ", totalPrice=" + totalPrice
				+ ", totalItem=" + totalItem + ", totalDiscountedPrice=" + totalDiscountedPrice + ", discount="
				+ discount + "]";
	}
	
	

}
