package com.example.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ProductDataDTO {
    private Integer id;
    private Integer categoryId;
    private String name;
    private Integer quantity;
    private String description;
    private Integer created;
    private LocalDateTime createdDate;
    private Integer updated;
    private String updatedDate;
    private Byte status;

}
