package com.example.dto.request;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderRequestDTO {
    private UUID id;
    private Integer quantity;
    private Double price;
    private Boolean isStatus;
    private UsersRequestDTO user;
    private VoucherRequestDTO voucher;
    private Set<UUID> orderProducts;
}
