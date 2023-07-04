package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "color")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "status")
    @NotNull
    private Byte status;

}
