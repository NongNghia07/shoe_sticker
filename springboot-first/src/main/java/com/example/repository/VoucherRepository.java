package com.example.repository;

import com.example.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface VoucherRepository extends JpaRepository<Vouchers, UUID> {

}
