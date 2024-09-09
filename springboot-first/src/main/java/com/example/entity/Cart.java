package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart implements Serializable {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @Column(name = "price")
    private Double price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "is_status")
    private Boolean isStatus;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "cart")
    @JsonIgnore
    @JoinColumn(name = "user_ID")
    private Users user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cart")
    @JsonIgnore
    private Set<Cart_Product> cart_products;

}
