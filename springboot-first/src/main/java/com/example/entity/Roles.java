package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "roles")
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @NotNull
    private Byte status;

}
