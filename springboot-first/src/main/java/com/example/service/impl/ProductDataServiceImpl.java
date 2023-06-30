package com.example.service.impl;

import com.example.dto.ProductDataDTO;
import com.example.entity.ProductData;
import com.example.repository.ProductDataRepository;
import com.example.service.ProductDataService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductDataServiceImpl implements ProductDataService {
    private final ProductDataRepository productDataRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public ProductDataServiceImpl(ProductDataRepository productDataRepository, ModelMapper modelMapper) {
        this.productDataRepository = productDataRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<ProductDataDTO> findAll() {
        return this.productDataRepository.findAll().stream().map(o -> modelMapper.map(o, ProductDataDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProductDataDTO create(ProductDataDTO productDataDTO) {
        ProductData productData = modelMapper.map(productDataDTO, ProductData.class);
        productData.setCreatedDate(LocalDateTime.now());
        this.productDataRepository.save(productData);
        productDataDTO.setId(productData.getId());
        productDataDTO.setCreatedDate(productData.getCreatedDate());
        return productDataDTO;
    }

    @Override
    public ProductDataDTO update(ProductDataDTO productDataDTO) {
        ProductData productData = modelMapper.map(productDataDTO, ProductData.class);
        productData.setUpdatedDate(LocalDateTime.now());
        this.productDataRepository.save(productData);
        productDataDTO.setUpdatedDate(productData.getUpdatedDate());
        return productDataDTO;
    }

    @Override
    public ProductDataDTO findById(Long id) {
        return modelMapper.map(this.productDataRepository.findById(id).orElseThrow(), ProductDataDTO.class);
    }

    @Override
    public void setStatusFalse(Long id) {
        ProductData productData = this.productDataRepository.findById(id).orElseThrow();
        productData.setStatus((byte) 0);
        this.productDataRepository.save(productData);
    }
}
