package com.example.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "media")
public class Media implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "productData_id")
    @NotNull
    private ProductData productData;

    @ManyToOne
    @JoinColumn(name = "productDetail_id")
    private ProductDetail productDetail;

    @Column(name = "type")
    @NotNull
    private Byte type;

    @Column(name = "url")
    @NotNull
    private String url;

    @Column(name = "status")
    private Byte status;

}
