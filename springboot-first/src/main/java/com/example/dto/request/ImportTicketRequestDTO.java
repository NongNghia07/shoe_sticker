package com.example.dto.request;

import lombok.*;

import java.util.Set;
import java.util.UUID;


@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ImportTicketRequestDTO  {
    private UUID id;
    private String code;
    private Integer quantity;
    private Boolean isStatus;
    private Set<UUID> importTicketProducts;
    private Set<SupplierRequestDTO> supplierRequestDTOs;
}
