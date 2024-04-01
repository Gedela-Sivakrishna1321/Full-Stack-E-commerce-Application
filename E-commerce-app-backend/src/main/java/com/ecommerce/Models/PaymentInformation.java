package com.ecommerce.Models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;

public class PaymentInformation {
	
	@Column(name = "cardholder_name")
	private String cardholderName;
	
	@Column(name = "card_number")
	private String cardNumber;
	
	@Column(name = "expiration_date")
	private LocalDateTime expirationDate;
	
	@Column(name = "cvv")
	private String cvv;
}
