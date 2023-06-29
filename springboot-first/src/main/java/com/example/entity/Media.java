package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "media")
public class Media {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "productData_id")
    private Integer productDataId;

    @Column(name = "productDetail_id")
    private Integer productDetailId;

    @Column(name = "type")
    private Byte type;

    @Column(name = "url")
    private String url;

    @Column(name = "status")
    private Byte status;

}
