package com.example.service.impl;

import com.example.dto.ProductDataDTO;
import com.example.dto.ProductDetailDTO;
import com.example.dto.SizeDTO;
import com.example.entity.ProductData;
import com.example.entity.ProductDetail;
import com.example.exception.ApiRequestException;
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
    public List<ProductDetailDTO> updateAll(List<ProductDetailDTO> productDetailDTOS, Integer status) {
        List<ProductDetail> productDetails = productDetailDTOS.stream().map(o -> modelMapper.map(o, ProductDetail.class)).collect(Collectors.toList());
        List<ProductDetail> productDetailsOld = this.productDetailRepository.findAllByProductDataId(status, productDetails.get(0).getProductData().getId());
        for (ProductDetail o : productDetailsOld) {
            o.setStatus((byte) 0);
            this.productDetailRepository.save(o);
        }
        for (ProductDetail p : productDetails) {
            if (p.getId() != null) {
                ProductDetail productDetail = this.productDetailRepository.findById(Long.valueOf(p.getId())).orElseThrow();
                if (!p.getQuantity().equals(productDetail.getQuantity()) || !p.getPrice().equals(productDetail.getPrice())) {
                    productDetail.setUpdatedDate(LocalDateTime.now());
                    productDetail.setQuantity(p.getQuantity());
                    productDetail.setPrice(p.getPrice());
                    productDetail.setStatus((byte) 1);
                    this.productDetailRepository.save(productDetail);
                } else {
                    productDetail.setStatus((byte) 1);
                    this.productDetailRepository.save(productDetail);
                }
            } else {
                ProductDetail productDetail = this.productDetailRepository.findByColorIdAndSizeId(p.getProductData().getId(), p.getColor().getId(), p.getSize().getId());
                if (productDetail != null && (!p.getQuantity().equals(productDetail.getQuantity()) || !p.getPrice().equals(productDetail.getPrice()))) {
                    productDetail.setUpdated(1);
                    productDetail.setUpdatedDate(LocalDateTime.now());
                    productDetail.setQuantity(p.getQuantity());
                    productDetail.setPrice(p.getPrice());
                    productDetail.setStatus((byte) 1);
                    this.productDetailRepository.save(productDetail);
                } else if (productDetail == null) {
                    p.setCreated(1);
                    p.setCreatedDate(LocalDateTime.now());
                    p.setStatus((byte) 1);
                    this.productDetailRepository.save(p);
                } else {
                    productDetail.setStatus((byte) 1);
                    this.productDetailRepository.save(productDetail);
                }
            }
        }

        return productDetailDTOS;
    }

    @Override
    public ProductDetailDTO findById(Long id) {
        return modelMapper.map(this.productDetailRepository.findById(id).orElseThrow(), ProductDetailDTO.class);
    }

    @Override
    public List<ProductDetailDTO> findAllByProductDataId(Integer status, Integer product_data_id) {
        List<ProductDetail> productDetails = this.productDetailRepository.findAllByProductDataId(status, product_data_id);
        if (productDetails.isEmpty()) {
            throw new ApiRequestException("Not found with id: " + product_data_id);
        }
        List<ProductDetailDTO> productDetailDTOS = new ArrayList<>();
        List<SizeDTO> sizes = new ArrayList<>();
        for (int i = 0; i < productDetails.size(); i++) {
            ProductDetailDTO productDetailDTO = new ProductDetailDTO();
            if (productDetails.size() < 2) {
                productDetailDTO = modelMapper.map(productDetails.get(i), ProductDetailDTO.class);
                productDetailDTO.setLabel(productDetails.get(i).getColor().getName());
                productDetailDTO.setValue(productDetails.get(i).getColor().getId());
                productDetailDTO.setProductDataName(productDetails.get(i).getProductData().getName());
                sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), productDetails.get(i).getSize().getName(), productDetails.get(i).getQuantity(), (byte) 1, true, productDetails.get(i).getId()));
                productDetailDTO.setSizes(sizes);
                productDetailDTOS.add(productDetailDTO);
            } else {
                if (i == 0) {
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), productDetails.get(i).getSize().getName(), productDetails.get(i).getQuantity(), (byte) 1, true, productDetails.get(i).getId()));
                } else if ((i < productDetails.size() - 1) && (productDetails.get(i).getColor().getId() != productDetails.get(i - 1).getColor().getId())) {
                    productDetailDTO = modelMapper.map(productDetails.get(i - 1), ProductDetailDTO.class);
                    productDetailDTO.setLabel(productDetails.get(i - 1).getColor().getName());
                    productDetailDTO.setValue(productDetails.get(i - 1).getColor().getId());
                    productDetailDTO.setProductDataName(productDetails.get(i - 1).getProductData().getName());
                    productDetailDTO.setSizes(sizes);
                    productDetailDTOS.add(productDetailDTO);
                    //
                    sizes = new ArrayList<>();
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), productDetails.get(i).getSize().getName(), productDetails.get(i).getQuantity(), (byte) 1, true, productDetails.get(i).getId()));
                } else if (((i + 1) == productDetails.size()) && (productDetails.get(i).getColor().getId() == productDetails.get(i - 1).getColor().getId())) {
                    productDetailDTO = modelMapper.map(productDetails.get(i), ProductDetailDTO.class);
                    productDetailDTO.setValue(productDetails.get(i).getColor().getId());
                    productDetailDTO.setProductDataName(productDetails.get(i).getProductData().getName());
                    productDetailDTO.setLabel(productDetails.get(i).getColor().getName());
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), productDetails.get(i).getSize().getName(), productDetails.get(i).getQuantity(), (byte) 1, true, productDetails.get(i).getId()));
                    productDetailDTO.setSizes(sizes);
                    productDetailDTOS.add(productDetailDTO);
                } else if (((i + 1) == productDetails.size()) && (productDetails.get(i).getColor().getId() != productDetails.get(i - 1).getColor().getId())) {
                    productDetailDTO = modelMapper.map(productDetails.get(i - 1), ProductDetailDTO.class);
                    productDetailDTO.setValue(productDetails.get(i - 1).getColor().getId());
                    productDetailDTO.setProductDataName(productDetails.get(i - 1).getProductData().getName());
                    productDetailDTO.setLabel(productDetails.get(i - 1).getColor().getName());
                    productDetailDTO.setSizes(sizes);
                    productDetailDTOS.add(productDetailDTO);
                    //
                    productDetailDTO = new ProductDetailDTO();
                    sizes = new ArrayList<>();
                    productDetailDTO = modelMapper.map(productDetails.get(i), ProductDetailDTO.class);
                    productDetailDTO.setValue(productDetails.get(i).getColor().getId());
                    productDetailDTO.setProductDataName(productDetails.get(i).getProductData().getName());
                    productDetailDTO.setLabel(productDetails.get(i).getColor().getName());
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), productDetails.get(i).getSize().getName(), productDetails.get(i).getQuantity(), (byte) 1, true, productDetails.get(i).getId()));
                    productDetailDTO.setSizes(sizes);
                    productDetailDTOS.add(productDetailDTO);
                } else {
                    sizes.add(new SizeDTO(productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getId(), productDetails.get(i).getSize().getName(), productDetails.get(i).getSize().getName(), productDetails.get(i).getQuantity(), (byte) 1, true, productDetails.get(i).getId()));
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
