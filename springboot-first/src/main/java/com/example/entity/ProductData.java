package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "product_data")
public class ProductData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull
    private Category category;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "quantity")
    @NotNull
    @Pattern(regexp = "/d")
    private Integer quantity;

    @Column(name = "description")
    private String description;

    @Column(name = "created")
    @NotNull
    private Integer created;

    @Column(name = "created_date")
    @NotNull
    private LocalDateTime createdDate;

    @Column(name = "updated")
    private Integer updated;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "status")
    @NotNull
    private Byte status;

}
