package com.example.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDataDTO {
    private Integer id;
    private Integer userId;
    private String firstName;
    private String lastName;
    private String email;
    private String telephone;
    private String address;
    private Integer created;
    private LocalDateTime createdDate;
    private Integer updated;
    private LocalDateTime updatedDate;
    private String image;
    private Byte status;

}
