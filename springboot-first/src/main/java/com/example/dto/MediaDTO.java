package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MediaDTO {
    private Integer id;

    @NotBlank(message = "ProductDataId can't be null")
    private Integer productDataId;

    @NotBlank(message = "ProductDetailId can't be null")
    private Integer productDetailId;

    @NotBlank(message = "Type can't be null")
    private Byte type;

    @NotBlank(message = "Url can't be null")
    private String url;

    private Byte status;
    private String color;
    private Integer colorId;
}
