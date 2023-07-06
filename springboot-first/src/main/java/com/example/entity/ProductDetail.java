package com.example.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_detail")
public class ProductDetail implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id", insertable = true, updatable = true, nullable = false)
    @NotNull
    private ProductData productData;

    @ManyToOne
    @JoinColumn(name = "color_id", insertable = true, updatable = true, nullable = false)
    @NotNull
    private Color color;

    @ManyToOne
    @JoinColumn(name = "size_id", insertable = true, updatable = true, nullable = false)
    @NotNull
    private Size size;

    @Column(name = "quantity")
    @NotNull
    @Pattern(regexp = "/d")
    private Integer quantity;

    @Column(name = "price")
    @NotNull
    @Pattern(regexp = "/d")
    private Double price;

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

}
