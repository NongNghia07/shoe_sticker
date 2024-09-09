package com.example.entity;


import lombok.*;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "categories")
public class Categories implements Serializable {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_status")
    private Boolean isStatus;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "categories")
    Set<Products> products;

}
