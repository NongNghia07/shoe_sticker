package com.example.dto.response;

import com.example.entity.ImportTicket_Supplier;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ImportTicket_SupplierResponseDTO {
    private UUID supplierID;
    private UUID ImportTicketID;
    private String supplierName;

    public ImportTicket_SupplierResponseDTO(ImportTicket_Supplier importTicket_Supplier) {
        if(importTicket_Supplier.getSupplierID() != null)
            this.supplierID = importTicket_Supplier.getSupplierID();
        if(importTicket_Supplier.getImportTicketID() != null)
            this.ImportTicketID = importTicket_Supplier.getImportTicketID();
        this.supplierName = importTicket_Supplier.getSupplier().getName();
    }
}
