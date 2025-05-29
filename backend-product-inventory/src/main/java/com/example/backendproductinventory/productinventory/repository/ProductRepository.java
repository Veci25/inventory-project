package com.example.backendproductinventory.productinventory.repository;

import com.example.backendproductinventory.productinventory.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}