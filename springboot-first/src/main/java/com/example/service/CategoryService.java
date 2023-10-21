package com.example.service;

import com.example.dto.CategoryDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {

    List<CategoryDTO> findAll();

    Page<CategoryDTO> findAllPage(Integer size, Integer page);

    List<CategoryDTO> searchAllByName(String keyword);

    CategoryDTO create(CategoryDTO categoryDTO);

    CategoryDTO update(CategoryDTO categoryDTO);

    CategoryDTO findById(Long id);

    void setStatusFalse(Long id);
}
