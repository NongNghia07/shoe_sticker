package com.example.service.impl;

import com.example.dto.response.SizeDTO;
import com.example.entity.Order;
import com.example.exception.ApiRequestException;
import com.example.repository.ProductDetailRepository;
import com.example.service.ProductDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        Order productDetail = modelMapper.map(productDetailDTO, Order.class);
        productDetail.setCreatedDate(LocalDateTime.now());
        this.productDetailRepository.save(productDetail);
        productDetailDTO.setCreatedDate(productDetail.getCreatedDate());
        productDetailDTO.setId(productDetail.getId());
        return productDetailDTO;
    }

    @Override
    public List<ProductDetailDTO> createAll(List<ProductDetailDTO> productDetailDTOS) {
        List<Order> productDetails = productDetailDTOS.stream().map(o -> modelMapper.map(o, Order.class)).collect(Collectors.toList());
        for (int i = 0; i < productDetails.size(); i++) {
            productDetails.get(i).setCreatedDate(LocalDateTime.now());
            productDetails.get(i).setStatus((byte) 1);
        }
        this.productDetailRepository.saveAll(productDetails);
        return productDetails.stream().map(o -> modelMapper.map(o, ProductDetailDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProductDetailDTO update(ProductDetailDTO productDetailDTO) {
        Order productDetail = modelMapper.map(productDetailDTO, Order.class);
        // Create productDetail

        productDetail.setUpdatedDate(LocalDateTime.now());
        this.productDetailRepository.save(productDetail);
        productDetailDTO.setUpdatedDate(productDetail.getUpdatedDate());
        return productDetailDTO;
    }

    @Override
    public List<ProductDetailDTO> updateAll(List<ProductDetailDTO> productDetailDTOS, Integer status) {
        List<Order> productDetails = productDetailDTOS.stream().map(o -> modelMapper.map(o, Order.class)).collect(Collectors.toList());
        List<Order> productDetailsOld = this.productDetailRepository.findAllByProductDataId(status, productDetails.get(0).getProductData().getId());
        for (Order o : productDetailsOld) {
            o.setStatus((byte) 0);
            this.productDetailRepository.save(o);
        }
        for (Order p : productDetails) {
            if (p.getId() != null) {
                Order productDetail = this.productDetailRepository.findById(Long.valueOf(p.getId())).orElseThrow();
                if (!p.getQuantity().equals(productDetail.getQuantity()) || !p.getPrice().equals(productDetail.getPrice())) {
                    productDetail.setUpdated(p.getUpdated());
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
                Order productDetail = this.productDetailRepository.findByColorIdAndSizeId(p.getProductData().getId(), p.getColor().getId(), p.getSize().getId());
                if (productDetail != null && (!p.getQuantity().equals(productDetail.getQuantity()) || !p.getPrice().equals(productDetail.getPrice()))) {
                    productDetail.setUpdated(p.getUpdated());
                    productDetail.setUpdatedDate(LocalDateTime.now());
                    productDetail.setQuantity(p.getQuantity());
                    productDetail.setPrice(p.getPrice());
                    productDetail.setStatus((byte) 1);
                    this.productDetailRepository.save(productDetail);
                } else if (productDetail == null) {
                    p.setCreated(p.getUpdated());
                    p.setCreatedDate(LocalDateTime.now());
                    p.setUpdated(null);
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
        List<Order> productDetails = this.productDetailRepository.findAllByProductDataId(status, product_data_id);
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
        Order productDetail = this.productDetailRepository.findById(id).orElseThrow();
        productDetail.setStatus((byte) 0);
        this.productDetailRepository.save(productDetail);
    }

    @Override
    public void setAllStatusFalse(Integer id) {
        List<Order> productDetails = this.productDetailRepository.findAllByProductDataId(1, id);
        if (productDetails.isEmpty()) {
            throw new ApiRequestException("Not found with id: " + id);
        }
        for (Order p: productDetails) {
            p.setStatus((byte) 0);
            this.productDetailRepository.save(p);
        }
    }
}
