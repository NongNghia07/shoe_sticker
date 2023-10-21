package com.example.service.impl;

import com.example.dto.CategoryDTO;
import com.example.entity.Category;
import com.example.exception.ApiRequestException;
import com.example.repository.CategoryRepository;
import com.example.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;
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
        return this.categoryRepository.findAllByStatusOrderByIdDesc((byte)1).stream().map(o -> modelMapper.map(o, CategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Page<CategoryDTO> findAllPage(Integer size, Integer page) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Category> categoryPage = this.categoryRepository.findAllPageByStatusOrderByIdDesc(1, pageable);
        Page<CategoryDTO> categoryDTOPage = categoryPage.map(new Function<Category, CategoryDTO>() {
            @Override
            public CategoryDTO apply(Category category) {
                CategoryDTO categoryDTO = new CategoryDTO();
                categoryDTO = modelMapper.map(category, CategoryDTO.class);
                return categoryDTO;
            }
        });
        return categoryDTOPage;
    }

    @Override
    public List<CategoryDTO> searchAllByName(String keyword) {
        return this.categoryRepository.findAllByStatusOrderByIdDesc((byte)1).stream().map(o -> modelMapper.map(o, CategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public CategoryDTO create(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        Category categoryOld = this.categoryRepository.findByName(category.getName());
        if(categoryOld != null){
            if(categoryOld.getStatus() == 1){
               throw new ApiRequestException("Tên đã tồn tại");
            }
        }
        category.setCreatedDate(LocalDateTime.now());
        category.setStatus((byte) 1);
        this.categoryRepository.save(category);
        categoryDTO = modelMapper.map(category, CategoryDTO.class);
        return categoryDTO;
    }

    @Override
    public CategoryDTO update(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        Category categoryOld = this.categoryRepository.findByName(category.getName());
        if(categoryOld != null){
            if(categoryOld.getStatus() == 1){
                throw new ApiRequestException("Tên đã tồn tại");
            }
        }
        Category categoryOld2 = this.categoryRepository.findById(Long.valueOf(category.getId())).orElseThrow();
        category.setCreated(categoryOld2.getCreated());
        category.setCreatedDate(categoryOld2.getCreatedDate());
        category.setUpdatedDate(LocalDateTime.now());
        category.setStatus(categoryOld2.getStatus());
        this.categoryRepository.save(category);
        categoryDTO = modelMapper.map(category, CategoryDTO.class);
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
