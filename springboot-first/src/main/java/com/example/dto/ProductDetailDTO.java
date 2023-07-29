package com.example.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class ProductDetailDTO {
    private Integer id;
    private Integer productDataId;
    private String productDataName;
    private Integer colorId;
    private Integer value;
    private String label;
    private Integer sizeId;
    private Integer quantity;
    private Double price;
    private Integer created;
    private LocalDateTime createdDate;
    private Integer updated;
    private LocalDateTime updatedDate;
    private Byte status;
    private List<SizeDTO> sizes = new ArrayList<>();
}
