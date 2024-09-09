package com.example.service.impl;

import com.example.dto.request.ProductsRequestDTO;
import com.example.dto.response.ProductsResponseDTO;
import com.example.dto.response.util.ServiceResponseDTO;
import com.example.entity.Products;
import com.example.exception.ApiRequestException;
import com.example.repository.ProductsRepository;
import com.example.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductsRepository productsRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductServiceImpl(ProductsRepository productsRepository, ModelMapper modelMapper) {
        this.productsRepository = productsRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ServiceResponseDTO<List<ProductsResponseDTO>> getAll() {
        try {
            List<Products> products = productsRepository.findAll();
            List<ProductsResponseDTO> productsDTOList = new ArrayList<>();
            for (Products product: products) {
                ProductsResponseDTO productsDTO = new ProductsResponseDTO(product);
                productsDTOList.add(productsDTO);
            }
            return ServiceResponseDTO.success(HttpStatus.OK, productsDTOList);
        }catch (Exception e){
            e.printStackTrace();
            throw new ApiRequestException(e.getMessage());
        }
    }

    @Override
    public ServiceResponseDTO<PageImpl<ProductsResponseDTO>> getPage(Pageable pageable) {
        Page<Products> page = productsRepository.findAll(pageable);
        List<ProductsResponseDTO> productsDTOList = new ArrayList<>();
        for (Products product: page.getContent()) {
            ProductsResponseDTO productsDTO = new ProductsResponseDTO(product);
            productsDTOList.add(productsDTO);
        }
        return ServiceResponseDTO.success(HttpStatus.OK, new PageImpl<>(productsDTOList, pageable, page.getTotalElements()));
    }

    @Override
    public ServiceResponseDTO<ProductsResponseDTO> create(ProductsRequestDTO productsRequestDTO) {
        try {
            Products products = modelMapper.map(productsRequestDTO, Products.class);
            products.setCreateDate(LocalDateTime.now());
            productsRepository.save(products);
            ProductsResponseDTO productsResponseDTO = new ProductsResponseDTO(products);
            return ServiceResponseDTO.success(HttpStatus.OK, productsResponseDTO);
        }catch (Exception e){
            e.printStackTrace();
            throw new ApiRequestException(e.getMessage());
        }
    }

    @Override
    public ServiceResponseDTO<ProductsResponseDTO> update(ProductsRequestDTO productsRequestDTO) {
        try {
            Products products = modelMapper.map(productsRequestDTO, Products.class);
            products.setUpdateDate(LocalDateTime.now());
            productsRepository.save(products);
            ProductsResponseDTO productsResponseDTO = new ProductsResponseDTO(products);
            return ServiceResponseDTO.success(HttpStatus.OK, productsResponseDTO);
        }catch (Exception e){
            e.printStackTrace();
            throw new ApiRequestException(e.getMessage());
        }
    }

    @Override
    public ServiceResponseDTO<ProductsResponseDTO> findByID(UUID productID) {
        Products products = productsRepository.findById(productID).orElseThrow(() -> new ApiRequestException("Product not found"));
        ProductsResponseDTO productsResponseDTO = new ProductsResponseDTO(products);
        return ServiceResponseDTO.success(HttpStatus.OK, productsResponseDTO);
    }

    @Override
    public ServiceResponseDTO<ProductsResponseDTO> deletes(List<UUID> ids) {
        List<Products> products = productsRepository.findAllById(ids);
        productsRepository.deleteAll(products);
        return ServiceResponseDTO.success(HttpStatus.OK, null);
    }

}
