package com.example.service;

import com.example.dto.ProductDataDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductDataService {

    List<ProductDataDTO> findAll();

    Page<ProductDataDTO> findAllPage(Integer size, Integer page);

    ProductDataDTO create(ProductDataDTO productDataDTO);

    ProductDataDTO update(ProductDataDTO productDataDTO);

    ProductDataDTO findById(Long id);

    void setStatusFalse(Long id);
}
