package com.example.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDataDTO {
    private Integer id;

    @NotBlank(message = "CategoryId can't be null")
    private Integer categoryId;

    @NotBlank(message = "Name can't be null")
    private String name;

    @NotBlank(message = "Quantity can't be null")
    @Pattern(regexp = "/d", message = "Quantity is number")
    private Integer quantity;

    private String description;
    private Integer created;
    private LocalDateTime createdDate;
    private Integer updated;
    private LocalDateTime updatedDate;
    private Byte status;
    private List<MediaDTO> listMediaDTO;

}
