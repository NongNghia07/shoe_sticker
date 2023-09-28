package com.example.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    //cascade = {CascadeType.MERGE}, fetch = FetchType.EAGER
    @ManyToOne
//    @MapsId("productId")
    @JoinColumn(name = "product_data_id", insertable = true, updatable = true, nullable = false)
    private ProductData productData;

    @ManyToOne
    @JoinColumn(name = "color_id", insertable = true, updatable = true, nullable = false)
    private Color color;

    @ManyToOne
    @JoinColumn(name = "size_id", insertable = true, updatable = true, nullable = false)
    private Size size;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")

    private Double price;

    @Column(name = "created")
    private Integer created;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated")
    private Integer updated;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "status")
    private Byte status;

}
