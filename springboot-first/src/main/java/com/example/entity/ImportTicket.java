package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "import_ticket")
public class ImportTicket implements Serializable {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @Column(name = "code")
    private String code;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "creator")
    private Integer creator;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "is_status")
    private Boolean isStatus;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "importTicket")
    @JsonIgnore
    private Set<ImportTicket_Supplier> importTicketSuppliers;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "importTicket")
    @JsonIgnore
    private Set<ImportTicket_Product> importTicketProducts;
}
