package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Pattern;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO  {
    private Integer id;

    @NotBlank(message = "userName can't be null")
    @Pattern(regexp = "^[A-Za-z]+[a-zA-Z0-9]+", message = "Invalid userName entered")
    private String userName;

    @NotBlank(message = "Password can't be null")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,16}$",
            message = "Mật khẩu phải có độ dài 6-12 ký tự, phải chứa ít nhất 1 ký tự thường, 1 ký tự viết hoa, 1 chữ số")
//    "^(?=.*[az])(?=.*[AZ])(?=.*[0-9])(?=.*[!@#$%^&* ])[a-zA-Z0-9!@#$%^&*]{4,12}$"
    private String password;
    private Byte status;
}
