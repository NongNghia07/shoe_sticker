package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryDTO {
    private Integer id;

    @NotBlank(message = "Name can't be null")
    private String name;

    private Integer created;
    private LocalDateTime createdDate;
    private Integer updated;
    private LocalDateTime updatedDate;
    private Byte status;

}
