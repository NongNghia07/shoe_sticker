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
@Table(name = "user_data")
public class UserData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_Id")
    private UserLogin userLogin;

    @Column(name = "first_Name")
    private String firstName;

    @Column(name = "last_Name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "address")
    private String address;

    @Column(name = "created")
    private Integer created;

    @Column(name = "created_Date")
    private LocalDateTime createdDate;

    @Column(name = "updated")
    private Integer updated;

    @Column(name = "updated_Date")
    private LocalDateTime updatedDate;

    @Column(name = "image")
    private String image;

    @Column(name = "status")
    private Byte status;

}
