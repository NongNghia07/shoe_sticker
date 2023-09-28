package com.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDataDTO {
    private Integer id;
    private Integer userId;

    @NotBlank(message = "FirstName can't be null")
    @Pattern(regexp = "^[A-Za-z]", message = "Invalid firstName entered")
    private String firstName;

    @NotBlank(message = "SizeId can't be null")
    @Pattern(regexp = "^[A-Za-z]", message = "Invalid lastName entered")
    private String lastName;

    @Email(message = "Invalid email entered")
    private String email;

    @NotBlank(message = "SizeId can't be null")
    @Pattern(regexp = "/d{10,11}", message = "Phone number from 10 to 11 digits")
    private String telephone;
    private String address;
    private Integer created;
    private LocalDateTime createdDate;
    private Integer updated;
    private LocalDateTime updatedDate;
    private String image;
    private Byte status;

}
