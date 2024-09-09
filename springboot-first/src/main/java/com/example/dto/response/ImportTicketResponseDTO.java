package com.example.dto.response;

import com.example.entity.ImportTicket;
import com.example.entity.ImportTicket_Product;
import com.example.entity.ImportTicket_Supplier;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ImportTicketResponseDTO {
    private UUID id;
    private String code;
    private Integer quantity;
    private Integer creator;
    private LocalDateTime createDate;
    private Boolean isStatus;
    private Set<ImportTicket_ProductResponseDTO> importTicketProductDTOs;
    private Set<ImportTicket_SupplierResponseDTO> importTicketSupplierDTOs;

    public ImportTicketResponseDTO(ImportTicket importTicket){
        if(importTicket.getId() != null)
            this.id = importTicket.getId();
        this.code = importTicket.getCode();
        this.quantity = importTicket.getQuantity();
        this.creator = importTicket.getCreator();
        this.createDate = importTicket.getCreateDate();
        this.isStatus = importTicket.getIsStatus();
        if(!importTicket.getImportTicketProducts().isEmpty())
            this.importTicketProductDTOs = convertImportTicketProductDTO(importTicket.getImportTicketProducts());
        if(!importTicket.getImportTicketSuppliers().isEmpty())
            this.importTicketSupplierDTOs = convertImportTicketSupplierDTO(importTicket.getImportTicketSuppliers());
    }

    private Set<ImportTicket_ProductResponseDTO> convertImportTicketProductDTO(Set<ImportTicket_Product> importTicketProducts){
        Set<ImportTicket_ProductResponseDTO> importTicketProductDTOs = new HashSet<>();
        for(ImportTicket_Product importTicketProduct : importTicketProducts){
            ImportTicket_ProductResponseDTO importTicketProductDTO = new ImportTicket_ProductResponseDTO(importTicketProduct);
            importTicketProductDTOs.add(importTicketProductDTO);
        }
        return importTicketProductDTOs;
    }

    private Set<ImportTicket_SupplierResponseDTO> convertImportTicketSupplierDTO(Set<ImportTicket_Supplier> importTicketSupplier){
        Set<ImportTicket_SupplierResponseDTO> importTicketSupplierDTOs = new HashSet<>();
        for (ImportTicket_Supplier importSupplier : importTicketSupplier){
            ImportTicket_SupplierResponseDTO importTicketSupplierDTO = new ImportTicket_SupplierResponseDTO(importSupplier);
            importTicketSupplierDTOs.add(importTicketSupplierDTO);
        }
        return importTicketSupplierDTOs;
    }
}
