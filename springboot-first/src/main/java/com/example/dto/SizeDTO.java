package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeDTO {
    private Integer id;
    private String name;
    private Byte status;
    private Integer id_productDetail;
}
