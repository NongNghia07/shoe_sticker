package com.example.repository;
import com.example.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
    List<Size> findAllByStatusOrderByIdDesc(Integer status);

    Size findByName(String name);

    Page<Size> findAllPageByStatusOrderByIdDesc(Integer status, Pageable pageable);

    @Query("SELECT s FROM Size s WHERE s.name like %?1% AND s.status = ?2 order by s.id desc")
    List<Size> findAllPageByNameAndStatusOrderByIdDesc(String keyword, Integer status, Pageable pageable);
}
