package com.example.service;

import com.example.dto.request.ProductsRequestDTO;
import com.example.dto.response.ProductsResponseDTO;
import com.example.dto.response.util.ServiceResponseDTO;
import com.example.entity.Price_Product;
import com.example.exception.ApiRequestException;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface ProductService {
    public static Double getProductPrice(UUID productID, Set<Price_Product> priceProducts){
        for(Price_Product product: priceProducts) {
            if(product.getProductID() == productID)
                return product.getPrice().getPrice();
        }
        throw new ApiRequestException("price not found");
    }

    ServiceResponseDTO<List<ProductsResponseDTO>> getAll();

    ServiceResponseDTO<PageImpl<ProductsResponseDTO>> getPage(Pageable pageable);

    ServiceResponseDTO<ProductsResponseDTO> create(ProductsRequestDTO productsRequestDTO);

    ServiceResponseDTO<ProductsResponseDTO> update(ProductsRequestDTO productsRequestDTO);

    ServiceResponseDTO<ProductsResponseDTO> findByID(UUID productID);

    ServiceResponseDTO<ProductsResponseDTO> deletes(List<UUID> ids);
}
