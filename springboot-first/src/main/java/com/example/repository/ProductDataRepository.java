package com.example.repository;

import com.example.entity.ProductData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDataRepository extends JpaRepository<ProductData, Long> {
    Page<ProductData> findAllPageByStatusOrderByIdDesc(Integer status, Pageable pageable);

    List<ProductData> findAllByStatusOrderByIdDesc(Integer status);

    @Query("SELECT p FROM ProductData p WHERE REPLACE(p.name, ' ', '') = ?1")
    ProductData findByNameAndStatus(String name,Integer status);

    @Query("SELECT p FROM ProductData p WHERE p.name like %?1% AND p.status = ?2 order by p.id desc")
    List<ProductData> findAllByNameAndStatusOrderByIdDesc(String keyword,Integer status);
}
