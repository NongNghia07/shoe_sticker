package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "price_product")
public class Price_Product implements Serializable {
    @Id
    @Column(name = "price_ID")
    private UUID PriceID;

    @Id
    @Column(name = "product_ID")
    private UUID productID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Products product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Price price;
}
