package com.ecommerce.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Models.Product;
import com.ecommerce.Request.CreateProductRequest;
import com.ecommerce.Response.ApiResponse;
import com.ecommerce.Service.ProductService;

@RestController
@RequestMapping("/api/admin/products")
//@CrossOrigin(origins = "http://localhost:3000")
public class AdminProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/")
	public ResponseEntity<ApiResponse> createProduct(@RequestBody CreateProductRequest req) {
		
		Product product = productService.createProduct(req);
		ApiResponse response = new ApiResponse("Product created successfully !");
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) throws ProductException {
		
		productService.deleteProduct(productId);
		
		ApiResponse response = new ApiResponse();
		response.setMessage("Product Deleted Successfully !");
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
		
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> findAllProduct() {
		
		List<Product> products = productService.findAllProducts();
		
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}
	
	@PutMapping("/{productId}/update")
	public ResponseEntity<Product> updateProduct(@RequestBody Product req, @PathVariable Long productId) throws ProductException {
		
		Product product = productService.updateProduct(productId, req);
		
		return new ResponseEntity<Product>(product, HttpStatus.CREATED);
	}
	
	@PostMapping("/creates")
	public ResponseEntity<ApiResponse> createMultipleProducts(@RequestBody CreateProductRequest[] req) {
		
		for(CreateProductRequest productRequest : req) {
			productService.createProduct(productRequest);
		}
		
		ApiResponse response = new ApiResponse();
		response.setMessage("Multiple Products Added successfully !");
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}

}
