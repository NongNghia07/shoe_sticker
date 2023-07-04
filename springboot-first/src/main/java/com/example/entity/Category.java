package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;

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
