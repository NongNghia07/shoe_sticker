package com.example.dto.request;

import com.example.entity.Products;
import com.example.entity.Users;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartRequestDTO {
    private UUID id;
    private UUID userID;
    private Double price;
    private Integer quantity;
    private Boolean isStatus;
    private ProductsRequestDTO productRequestDTO;
}
