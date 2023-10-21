package com.example.repository;

import com.example.entity.Color;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    List<Color> findAllByStatusOrderByIdDesc(Integer status);

    Color findByName(String name);
    Page<Color> findAllPageByStatusOrderByIdDesc(Integer status, Pageable pageable);

    @Query("SELECT c FROM Color c WHERE c.name like %?1% AND c.status = ?2 order by c.id desc")
    List<Color> findAllByNameAndStatusOrderByIdDesc(String keyword, Integer status);
}
