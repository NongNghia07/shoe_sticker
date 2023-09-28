package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class ProductDetailDTO {
    private Integer id;

    @NotBlank(message = "ProductDataId can't be null")
    private Integer productDataId;

    private String productDataName;

    @NotBlank(message = "ColorId can't be null")
    private Integer colorId;

    private Integer value;
    private String label;

    @NotBlank(message = "SizeId can't be null")
    private Integer sizeId;

    @NotBlank(message = "Quantity can't be null")
    @Pattern(regexp = "/d", message = "Quantity is number")
    private Integer quantity;

    @NotBlank
    @Pattern(regexp = "/d", message = "Quantity is number")
    private Double price;

    private Integer created;
    private LocalDateTime createdDate;
    private Integer updated;
    private LocalDateTime updatedDate;
    private Byte status;
    private List<SizeDTO> sizes = new ArrayList<>();
}
