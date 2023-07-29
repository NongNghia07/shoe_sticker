package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeDTO {
    private Integer id;
    private Integer value;
    private String name;
    private String label;
    private Integer quantity;
    private Byte status;
    private Boolean isDisabled;
    private Integer id_productDetail;
}
