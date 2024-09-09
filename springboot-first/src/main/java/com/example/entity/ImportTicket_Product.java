package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "importTicket_Product")
public class ImportTicket_Product implements Serializable {
    @Id
    @Column(name = "importTicket_ID")
    private UUID importTicketID;

    @Id
    @Column(name = "product_ID")
    private UUID productID;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Products products;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private ImportTicket importTicket;
}
