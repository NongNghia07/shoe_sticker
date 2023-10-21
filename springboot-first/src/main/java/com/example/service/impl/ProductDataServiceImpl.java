package com.example.service.impl;

import com.example.dto.ProductDataDTO;
import com.example.entity.ProductData;
import com.example.exception.ApiRequestException;
import com.example.repository.ProductDataRepository;
import com.example.service.MediaService;
import com.example.service.ProductDataService;
import com.example.service.UserLoginService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ProductDataServiceImpl implements ProductDataService {
    private final ProductDataRepository productDataRepository;
    private final MediaService mediaService;
    private final UserLoginService userLoginService;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductDataServiceImpl(ProductDataRepository productDataRepository, MediaService mediaService, UserLoginService userLoginService, ModelMapper modelMapper) {
        this.productDataRepository = productDataRepository;
        this.mediaService = mediaService;
        this.userLoginService = userLoginService;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<ProductDataDTO> findAll() {
        List<ProductDataDTO> productDataDTOS = this.productDataRepository.findAllByStatusOrderByIdDesc(1).stream().map(o -> modelMapper.map(o, ProductDataDTO.class)).collect(Collectors.toList());
        for (ProductDataDTO p: productDataDTOS) {
            p.setListMediaDTO(mediaService.findAllByProductDataID(p.getId()));
        }
        return productDataDTOS;
    }

    @Override
    public Page<ProductDataDTO> findAllPage(Integer size, Integer page) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductData> productDataPage = this.productDataRepository.findAllPageByStatusOrderByIdDesc(1, pageable);
        Page<ProductDataDTO> productDataDTOPage = productDataPage.map(new Function<ProductData, ProductDataDTO>() {
            @Override
            public ProductDataDTO apply(ProductData productData) {
                ProductDataDTO productDataDTO = new ProductDataDTO();
                productDataDTO = modelMapper.map(productData, ProductDataDTO.class);
                productDataDTO.setListMediaDTO(mediaService.findAllByProductDataID(productDataDTO.getId()));
                return productDataDTO;
            }
        });
        return productDataDTOPage;
    }

    @Override
    public List<ProductDataDTO> searchAllByName(String keyword) {
        List<ProductDataDTO> productDataDTOS = this.productDataRepository.findAllByNameAndStatusOrderByIdDesc(keyword, 1).stream().map(o -> modelMapper.map(o, ProductDataDTO.class)).collect(Collectors.toList());
        for (ProductDataDTO p: productDataDTOS) {
            p.setListMediaDTO(mediaService.findAllByProductDataID(p.getId()));
        }
        return productDataDTOS;
    }

    @Override
    public ProductDataDTO create(ProductDataDTO productDataDTO) {
        ProductData productData = modelMapper.map(productDataDTO, ProductData.class);
        ProductData productDataOld = this.productDataRepository.findByName(productData.getName());
        if(productDataOld != null){
            if(productDataOld.getStatus() == 1){
                throw new ApiRequestException("Tên product đã tồn tại");
            }
        }
        productData.setCreatedDate(LocalDateTime.now());
        productData.setStatus((byte) 1);
        this.productDataRepository.save(productData);
        productDataDTO.setId(productData.getId());
        productDataDTO.setCreatedDate(productData.getCreatedDate());
        return productDataDTO;
    }

    @Override
    public ProductDataDTO update(ProductDataDTO productDataDTO) {
        ProductData productData = modelMapper.map(productDataDTO, ProductData.class);
        ProductData productDataOld2 = this.productDataRepository.findByName(productData.getName());
        if(productDataOld2 != null){
            if(productDataOld2.getStatus() == 1){
                throw new ApiRequestException("Tên product đã tồn tại");
            }
        }
        ProductData productDataOld = this.productDataRepository.findById(Long.valueOf(productData.getId())).orElseThrow();
        productData.setCreated(productDataOld.getCreated());
        productData.setCreatedDate(productDataOld.getCreatedDate());
        productData.setUpdatedDate(LocalDateTime.now());
        productData.setStatus((byte) 1);
        this.productDataRepository.save(productData);
        productDataDTO.setUpdatedDate(productData.getUpdatedDate());
        return productDataDTO;
    }

    @Override
    public ProductDataDTO findById(Long id) {
        return modelMapper.map(this.productDataRepository.findById(id).orElseThrow(), ProductDataDTO.class);
    }

    @Override
    public void setStatusFalse(Long id, Integer userId) {
        ProductData productData = this.productDataRepository.findById(id).orElseThrow();
        productData.setUpdatedDate(LocalDateTime.now());
        productData.setUpdated(userId);
        productData.setStatus((byte) 0);
        this.productDataRepository.save(productData);
    }
}
