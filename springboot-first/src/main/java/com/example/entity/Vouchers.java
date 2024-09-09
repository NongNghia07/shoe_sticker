package com.example.entity;

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
@Table(name = "vouchers")
public class Vouchers implements Serializable {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "code")
    private String code;

    @Column(name = "discout")
    private String discout;

    @Column(name = "type")
    private Boolean type;

    @Column(name = "is_status")
    private Boolean isStatus = false;
}
