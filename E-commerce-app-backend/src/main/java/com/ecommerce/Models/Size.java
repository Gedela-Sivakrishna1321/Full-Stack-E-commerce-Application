package com.ecommerce.Models;

public class Size {
	
	private String name;
	
	private String quantity;
	
	public Size() {
		// TODO Auto-generated constructor stub
	}
	
	

	public Size(String name, String quantity) {
		super();
		this.name = name;
		this.quantity = quantity;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	
	

}
