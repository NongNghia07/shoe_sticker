package com.example.dto;

import lombok.Data;

@Data
public class UserLoginDTO {
    private Integer id;
    private String userName;
    private String password;
    private Byte status;

}
