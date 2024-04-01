package com.ecommerce.Service;

import java.util.List;
import com.ecommerce.Exceptions.ProductException;
import com.ecommerce.Models.Product;
import com.ecommerce.Request.CreateProductRequest;

public interface ProductService {
	
	public Product createProduct(CreateProductRequest req);
	
	public String deleteProduct(Long productId) throws ProductException;
	
	public Product updateProduct(Long productId, Product req) throws ProductException;
	
	public Product findProductById(Long id) throws ProductException;
	
	public List<Product> findProductByCategory(String category);
	
	public org.springframework.data.domain.Page<Product> getAllProduct(String category, List<String> colors, List<String> sizes, Integer minPrice, Integer maxPrice
			, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);
	
	public List<Product> findAllProducts();

}
