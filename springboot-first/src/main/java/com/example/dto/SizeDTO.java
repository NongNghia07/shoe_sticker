package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeDTO {
    private Integer id;
    private Integer value;

    @NotBlank(message = "Name can't be null")
    private String name;

    private String label;
    private Integer quantity;
    private Byte status;
    private Boolean isDisabled;
    private Integer id_productDetail;
}
