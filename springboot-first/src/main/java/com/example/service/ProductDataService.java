package com.example.service;

import com.example.dto.ProductDataDTO;

import java.util.List;

public interface ProductDataService {

    List<ProductDataDTO> findAll();

    ProductDataDTO create(ProductDataDTO productDataDTO);

    ProductDataDTO update(ProductDataDTO productDataDTO);

    ProductDataDTO findById(Long id);

    void setStatusFalse(Long id);
}
