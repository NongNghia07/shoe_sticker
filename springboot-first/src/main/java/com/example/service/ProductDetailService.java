package com.example.service;

import com.example.dto.ProductDetailDTO;

import java.util.List;

public interface ProductDetailService {

    List<ProductDetailDTO> findAll();

    ProductDetailDTO create(ProductDetailDTO productDetailDTO);

    List<ProductDetailDTO> createAll(List<ProductDetailDTO> productDetailDTOS);

    ProductDetailDTO update(ProductDetailDTO productDetailDTO);

    ProductDetailDTO findById(Long id);

    void setStatusFalse(Long id);
}
