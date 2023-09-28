package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RolesDTO {
    private Integer id;

    @NotBlank(message = "Name can't be null")
    private String name;

    private String description;
    private Byte status;

}
