package com.example.dto.request;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoriesRequestDTO {
    private UUID id;
    private String name;
    private Boolean isStatus = true;
}
