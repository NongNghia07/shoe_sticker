package com.example.repository;

import com.example.entity.ImportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface ImportTicketRepository extends JpaRepository<ImportTicket, UUID> {

}
