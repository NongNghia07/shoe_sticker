package com.example.dto.request;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PriceRequestDTO {
    private Integer id;
    private Double tax;
    private Double price;
    private Double currentPrice;
}
