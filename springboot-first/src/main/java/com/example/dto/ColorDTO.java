package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ColorDTO {
    private Integer id;
    private Integer value;

    @NotBlank(message = "Name can't be null")
    private String name;

    private String label;
    private Byte status;
}
