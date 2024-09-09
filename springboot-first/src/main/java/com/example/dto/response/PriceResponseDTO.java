package com.example.dto.response;

import com.example.entity.Price;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PriceResponseDTO {
    private UUID id;
    private Double tax;
    private Double price;
    private Double currentPrice;

    public PriceResponseDTO(Price price){
        if(price.getId() != null)
            this.id = price.getId();
        this.currentPrice = price.getPrice();
        this.tax = price.getTax();
        this.price = price.getPrice();
    }
}
