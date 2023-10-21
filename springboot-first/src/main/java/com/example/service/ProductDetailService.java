package com.example.service;

import com.example.dto.ProductDetailDTO;

import java.util.List;

public interface ProductDetailService {

    List<ProductDetailDTO> findAll();

    ProductDetailDTO create(ProductDetailDTO productDetailDTO);

    List<ProductDetailDTO> createAll(List<ProductDetailDTO> productDetailDTOS);

    ProductDetailDTO update(ProductDetailDTO productDetailDTO);

    List<ProductDetailDTO> updateAll(List<ProductDetailDTO> productDetailDTOS, Integer status);

    ProductDetailDTO findById(Long id);

    List<ProductDetailDTO> findAllByProductDataId(Integer status, Integer product_data_id);

    void setStatusFalse(Long id);

    void setAllStatusFalse(Integer id);
}
