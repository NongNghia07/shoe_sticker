package com.example.repository;

import com.example.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    @Query("SELECT p FROM ProductDetail p WHERE p.status = ?1 AND p.productData.id = ?2 order by p.color.id DESC")
    List<ProductDetail> findAllByProductDataId(Integer status, Integer product_data_id);

    @Query("SELECT p FROM ProductDetail p WHERE p.productData.id = ?1 AND p.color.id = ?2 AND p.size.id = ?3")
    ProductDetail findByColorIdAndSizeId(Integer product_data_id, Integer color_id, Integer size_id);
}
