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
@Table(name = "bill_product")
public class Bill_Product implements Serializable {
    @Id
    @Column(name = "bill_ID")
    private UUID BillID;

    @Id
    @Column(name = "product_ID")
    private UUID productID;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "is_status")
    private Boolean isStatus = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Bill bill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Products product;
}
