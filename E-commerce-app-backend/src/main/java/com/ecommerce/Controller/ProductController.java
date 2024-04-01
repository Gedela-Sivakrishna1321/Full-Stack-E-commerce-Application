package com.ecommerce.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Models.Product;
import com.ecommerce.Service.ProductService;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	// Get products
	@GetMapping("/products") 
	public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category, @RequestParam 
			List<String> color, @RequestParam List<String> size, @RequestParam Integer minPrice,
			@RequestParam Integer maxPrice, @RequestParam Integer minDiscount, @RequestParam String sort,
			@RequestParam String stock, @RequestParam Integer pageNumber, @RequestParam Integer PageSize) {
	
		Page<Product> res  = productService.getAllProduct(category, color, size, minPrice, maxPrice, minDiscount, 
				sort, stock, pageNumber, PageSize);
		
		System.out.println("Complete products");
		
		return new ResponseEntity<Page<Product>>(res, HttpStatus.ACCEPTED);
	}
	
	// Find Product By Id
	@GetMapping("/products/id/{productId}") 
	public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException {
		
		Product product = productService.findProductById(productId);
		
		return new ResponseEntity<Product>(product, HttpStatus.ACCEPTED);
	}

}
