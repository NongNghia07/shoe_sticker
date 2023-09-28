package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRolesDTO {
    private Integer id;

    @NotBlank(message = "UserId can't be null")
    private Integer userId;

    @NotBlank(message = "RoleId can't be null")
    private Integer roleId;
}
