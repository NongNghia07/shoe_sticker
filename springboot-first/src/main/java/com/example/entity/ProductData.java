package com.example.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_data")
public class ProductData implements Serializable {
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
    private Byte status;

    @OneToMany(
            mappedBy = "productData",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ProductDetail> productDetails = new ArrayList<>();
}
