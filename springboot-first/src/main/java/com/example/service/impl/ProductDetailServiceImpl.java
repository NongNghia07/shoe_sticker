package com.example.service.impl;

import com.example.dto.ProductDataDTO;
import com.example.dto.ProductDetailDTO;
import com.example.dto.SizeDTO;
import com.example.entity.ProductData;
import com.example.entity.ProductDetail;
import com.example.repository.ProductDetailRepository;
import com.example.service.ProductDataService;
import com.example.service.ProductDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.SerializationUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
    private final ProductDetailRepository productDetailRepository;
    //    private final ProductDataService productDataService;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductDetailServiceImpl(ProductDetailRepository productDetailRepository, ModelMapper modelMapper) {
        this.productDetailRepository = productDetailRepository;
//        this.productDataService = productDataService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ProductDetailDTO> findAll() {
        return this.productDetailRepository.findAll().stream().map(o -> modelMapper.map(o, ProductDetailDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProductDetailDTO create(ProductDetailDTO productDetailDTO) {
        ProductDetail productDetail = modelMapper.map(productDetailDTO, ProductDetail.class);
        productDetail.setCreatedDate(LocalDateTime.now());
        this.productDetailRepository.save(productDetail);
        productDetailDTO.setCreatedDate(productDetail.getCreatedDate());
        productDetailDTO.setId(productDetail.getId());
        return productDetailDTO;
    }

    @Override
    public List<ProductDetailDTO> createAll(List<ProductDetailDTO> productDetailDTOS) {
        List<ProductDetail> productDetails = productDetailDTOS.stream().map(o -> modelMapper.map(o, ProductDetail.class)).collect(Collectors.toList());
        for (int i = 0; i < productDetails.size(); i++) {
            productDetails.get(i).setCreatedDate(LocalDateTime.now());
            productDetails.get(i).setStatus((byte) 1);
        }
        this.productDetailRepository.saveAll(productDetails);
        return productDetails.stream().map(o -> modelMapper.map(o, ProductDetailDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProductDetailDTO update(ProductDetailDTO productDetailDTO) {
        ProductDetail productDetail = modelMapper.map(productDetailDTO, ProductDetail.class);
        // Create productDetail
        productDetail.setUpdatedDate(LocalDateTime.now());
        this.productDetailRepository.save(productDetail);
        productDetailDTO.setUpdatedDate(productDetail.getUpdatedDate());
        return productDetailDTO;
    }

    @Override
    public ProductDetailDTO findById(Long id) {
        return modelMapper.map(this.productDetailRepository.findById(id).orElseThrow(), ProductDetailDTO.class);
    }

    @Override
    public List<ProductDetailDTO> findAllByProductDataId(Integer status, Integer product_data_id) {
        List<ProductDetail> productDetails = this.productDetailRepository.findAllByProductDataId(status, product_data_id);
        List<ProductDetailDTO> productDetailDTOS = new ArrayList<>();
        List<SizeDTO> sizes = new ArrayList<>();
        for (int i = 0; i < productDetails.size(); i++) {
            ProductDetailDTO productDetailDTO = new ProductDetailDTO();
            if (productDetails.size() < 2) {
                productDetailDTO = modelMapper.map(productDetails.get(i), ProductDetailDTO.class);
                sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), (byte) 1, productDetails.get(i).getId()));
                productDetailDTO.setSizeDTOList(sizes);
                productDetailDTOS.add(productDetailDTO);
            } else {
                if (i == 0) {
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), (byte) 1, productDetails.get(i).getId()));
                } else if ((i < productDetails.size() - 1) && (productDetails.get(i).getColor().getId() != productDetails.get(i - 1).getColor().getId())) {
                    productDetailDTO = modelMapper.map(productDetails.get(i - 1), ProductDetailDTO.class);
                    productDetailDTO.setSizeDTOList(sizes);
                    productDetailDTOS.add(productDetailDTO);
                    //
                    sizes = new ArrayList<>();
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), (byte) 1, productDetails.get(i).getId()));
                } else if (((i + 1) == productDetails.size()) && (productDetails.get(i).getColor().getId() == productDetails.get(i - 1).getColor().getId())) {
                    productDetailDTO = modelMapper.map(productDetails.get(i), ProductDetailDTO.class);
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), (byte) 1, productDetails.get(i).getId()));
                    productDetailDTO.setSizeDTOList(sizes);
                    productDetailDTOS.add(productDetailDTO);
                } else if (((i + 1) == productDetails.size()) && (productDetails.get(i).getColor().getId() != productDetails.get(i - 1).getColor().getId())) {
                    productDetailDTO = modelMapper.map(productDetails.get(i - 1), ProductDetailDTO.class);
                    productDetailDTO.setSizeDTOList(sizes);
                    productDetailDTOS.add(productDetailDTO);
                    //
                    productDetailDTO = new ProductDetailDTO();
                    sizes = new ArrayList<>();
                    productDetailDTO = modelMapper.map(productDetails.get(i), ProductDetailDTO.class);
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), (byte) 1, productDetails.get(i).getId()));
                    productDetailDTO.setSizeDTOList(sizes);
                    productDetailDTOS.add(productDetailDTO);
                } else {
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), (byte) 1, productDetails.get(i).getId()));
                }
            }
        }
        return productDetailDTOS;
    }

    @Override
    public void setStatusFalse(Long id) {
        ProductDetail productDetail = this.productDetailRepository.findById(id).orElseThrow();
        productDetail.setStatus((byte) 0);
        this.productDetailRepository.save(productDetail);
    }
}
