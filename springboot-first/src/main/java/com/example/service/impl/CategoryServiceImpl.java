package com.example.service.impl;

import com.example.dto.CategoryDTO;
import com.example.entity.Category;
import com.example.repository.CategoryRepository;
import com.example.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<CategoryDTO> findAll() {
        return this.categoryRepository.findAll().stream().map(o -> modelMapper.map(o, CategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public CategoryDTO create(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        category.setCreatedDate(LocalDateTime.now());
        this.categoryRepository.save(category);
        categoryDTO.setId(category.getId());
        categoryDTO.setCreatedDate(category.getCreatedDate());
        return categoryDTO;
    }

    @Override
    public CategoryDTO update(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        category.setUpdatedDate(LocalDateTime.now());
        this.categoryRepository.save(category);
        categoryDTO.setUpdatedDate(category.getUpdatedDate());
        return categoryDTO;
    }

    @Override
    public CategoryDTO findById(Long id) {
        return modelMapper.map(this.categoryRepository.findById(id).orElseThrow(), CategoryDTO.class);
    }

    @Override
    public void setStatusFalse(Long id) {
        Category category = this.categoryRepository.findById(id).orElseThrow();
        category.setStatus((byte) 0);
        this.categoryRepository.save(category);
    }
}
