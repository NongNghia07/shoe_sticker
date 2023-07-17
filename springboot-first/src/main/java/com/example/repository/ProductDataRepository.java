package com.example.repository;

import com.example.entity.ProductData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDataRepository extends JpaRepository<ProductData, Long> {
    @Query("SELECT p FROM ProductData p WHERE p.status = ?1 order by p.createdDate DESC")
    Page<ProductData> findAllPageWhereStatus(Integer status, Pageable pageable);
}
