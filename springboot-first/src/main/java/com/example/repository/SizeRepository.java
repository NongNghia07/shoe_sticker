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

    @Query("SELECT c FROM Color c WHERE REPLACE(c.name, ' ', '') = ?1")
    Size findByNameAndStatus(String name,Integer status);

    Page<Size> findAllPageByStatusOrderByIdDesc(Integer status, Pageable pageable);

    @Query("SELECT s FROM Size s WHERE s.name like %?1% AND s.status = ?2 order by s.id desc")
    List<Size> findAllByNameAndStatusOrderByIdDesc(String keyword, Integer status);
}
