package com.example.dto.request;


import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VoucherRequestDTO {
    private UUID id;
    private Integer quantity;
    private String code;
    private String discout;
    private Boolean type;
    private Boolean isStatus = false;
}
