package com.example.repository;

import com.example.entity.ImportTicket_Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ImportTicketProductRepository extends JpaRepository<ImportTicket_Product, UUID> {
}
