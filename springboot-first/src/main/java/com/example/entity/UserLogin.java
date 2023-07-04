package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@Entity
@Table(name = "user_login")
public class UserLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "userName")
    @NotNull
    @Pattern(regexp = "^[A-Za-z]")
    private String userName;

    //Có độ dài từ 8 - 50 kí tự
    //Có ít nhất 1 kí tự thường, 1 kí tự viết hoa và 1 chữ số
    //Có 1 trong các kí tự đặc biệt sau (! # $ @ _ + , ? . - )
//    @Pattern(regexp = "((?=.d)(?=.[a-z])(?=.[A-Z])(?=.[!.#$@_+,?-]).{8,50})")
    @Column(name = "password")
    @NotNull
    @Pattern(regexp = "((?=.d)(?=.[a-z])(?=.[A-Z]).{8,50})")
    private String password;

    @Column(name = "status")
    private Byte status;

}
