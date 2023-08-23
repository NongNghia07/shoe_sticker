package com.example.repository;

import com.example.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
    @Query("SELECT p FROM Media p WHERE p.status = ?1 and p.productData.id=?2")
    List<Media> findAllWhereProduct_Data_ID(Integer status, Integer product_data_id);

    @Query("SELECT p FROM Media p WHERE p.productData.id=?1 and p.url=?2")
    Media findByProductDataIDAndURL(Integer product_data_id, String url);
}
