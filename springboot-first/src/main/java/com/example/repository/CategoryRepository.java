package com.example.repository;

import com.example.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByStatusOrderByIdDesc(Byte status);
    Category findByName(String name);
    Page<Category> findAllPageByStatusOrderByIdDesc(Integer status, Pageable pageable);

    @Query("SELECT c FROM Category c WHERE c.name like %?1% AND c.status = ?2 order by c.id desc")
    List<Category> findAllPageByNameAndStatusOrderByIdDesc(String keyword, Integer status, Pageable pageable);
}
