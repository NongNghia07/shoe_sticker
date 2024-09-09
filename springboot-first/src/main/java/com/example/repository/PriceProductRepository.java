package com.example.repository;

import com.example.entity.Price_Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PriceProductRepository extends JpaRepository<Price_Product, UUID> {

}
