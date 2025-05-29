package com.example.backendproductinventory.productinventory.service;

import com.example.backendproductinventory.productinventory.exception.ResourceNotFoundException;
import com.example.backendproductinventory.productinventory.model.Product;
import com.example.backendproductinventory.productinventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setQuantityInStock(productDetails.getQuantityInStock());
        product.setCategory(productDetails.getCategory());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public Product partialUpdate(Long id, Map<String, Object> updates) {
        Product product = getProductById(id);

        updates.forEach((key, value) -> {
            switch (key) {
                case "name" -> {
                    if (value != null) product.setName((String) value);
                }
                case "description" -> {
                    if (value != null) product.setDescription((String) value);
                }
                case "price" -> {
                    if (value instanceof Number)
                        product.setPrice(((Number) value).doubleValue());
                }
                case "quantityInStock" -> {
                    if (value instanceof Integer)
                        product.setQuantityInStock((Integer) value);
                }
                case "category" -> {
                    if (value != null) product.setCategory((String) value);
                }
                default -> throw new IllegalArgumentException("Invalid field: " + key);
            }
        });

        return productRepository.save(product);
    }
}