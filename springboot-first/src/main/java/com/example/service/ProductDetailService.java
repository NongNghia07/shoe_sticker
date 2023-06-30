package com.example.service;

import com.example.dto.ProductDataDTO;
import com.example.dto.ProductDetailDTO;

import java.util.List;

public interface ProductDetailService {

    List<ProductDetailDTO> findAll();

    ProductDetailDTO create(ProductDataDTO productDataDTO, ProductDetailDTO productDetailDTO);

    ProductDetailDTO update(ProductDetailDTO productDetailDTO);

    ProductDetailDTO findById(Long id);

    void setStatusFalse(Long id);
}
