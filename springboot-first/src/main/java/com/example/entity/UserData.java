package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user_data")
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_Id")
    @NotNull
    private UserLogin userLogin;

    @Column(name = "first_Name")
    @NotNull
    @Pattern(regexp = "^[A-Za-z]")
    private String firstName;

    @Column(name = "last_Name")
    @NotNull
    @Pattern(regexp = "^[A-Za-z]")
    private String lastName;

    @Column(name = "email")
    @NotNull
    @Email(regexp = "")
    private String email;

    @Column(name = "telephone")
    @NotNull
    @Pattern(regexp = "/d{10,11}")
    private String telephone;

    @Column(name = "address")
    private String address;

    @Column(name = "created")
    @NotNull
    private Integer created;

    @Column(name = "created_Date")
    @NotNull
    private LocalDateTime createdDate;

    @Column(name = "updated")
    private Integer updated;

    @Column(name = "updated_Date")
    private LocalDateTime updatedDate;

    @Column(name = "image")
    private String image;

    @Column(name = "status")
    @NotNull
    private Byte status;

}
