package com.example.dto.request;

import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BillRequestTO {
    private UUID id;
    private Integer quantity;
    private Double price;
    private Boolean isStatus;
    private UsersRequestDTO userRequestDTO;
    private VoucherRequestDTO voucherRequestDTO;
    private Set<UUID> billProducts;
}
