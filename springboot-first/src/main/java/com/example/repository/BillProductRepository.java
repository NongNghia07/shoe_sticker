package com.example.repository;
import com.example.entity.Bill_Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BillProductRepository extends JpaRepository<Bill_Product, UUID> {
}
