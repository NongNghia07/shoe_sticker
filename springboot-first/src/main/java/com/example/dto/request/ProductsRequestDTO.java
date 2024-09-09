package com.example.dto.request;


import com.example.entity.Products;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductsRequestDTO {
    private Integer id;
    private String name;
    private Integer quantity;
    private String color;
    private String size;
    private String brand;
    private String description;
    private String image_URL;
    private Boolean isStatus = true;
    private CategoriesRequestDTO categoryRequestDTO;
    private Set<PriceRequestDTO> pricesRequestDTO;
    private RoleRequestDTO roleRequestDTO;
}
