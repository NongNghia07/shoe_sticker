package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "user_roles")
public class UserRoles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private UserLogin userLogin;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @NotNull
    private Roles roles;

}
