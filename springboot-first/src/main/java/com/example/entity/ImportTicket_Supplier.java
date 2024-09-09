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
@Table(name = "importTicket_Supplier")
public class ImportTicket_Supplier implements Serializable {
    @Id
    @Column(name = "importTicket_ID")
    private UUID importTicketID;

    @Id
    @Column(name = "supplier_ID")
    private UUID supplierID;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Supplier supplier;
}
