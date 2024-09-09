package com.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "price")
public class Price implements Serializable {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Double price;

    @Column(name = "curren_price")
    private Double currenPrice;

    @Column(name = "tax")
    private Double Tax;

    @Column(name = "creator")
    private Integer creator;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "updater")
    private Integer updater;

    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @Column(name = "status")
    private String status;
}
