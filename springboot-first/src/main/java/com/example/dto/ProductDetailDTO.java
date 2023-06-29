package com.example.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ProductDetailDTO {
    private Integer id;
    private Integer productId;
    private Integer colorId;
    private Integer sizeId;
    private Integer quantity;
    private Double price;
    private Integer created;
    private LocalDateTime createdDate;
    private Integer updated;
    private LocalDateTime updatedDate;
    private Byte status;

}
