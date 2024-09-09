package com.example.repository;

import com.example.entity.ImportTicket_Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ImportTicketSupplierRepository extends JpaRepository<ImportTicket_Supplier, UUID> {
}
