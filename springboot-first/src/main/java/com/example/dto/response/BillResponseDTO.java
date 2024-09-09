package com.example.dto.response;

import com.example.entity.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BillResponseDTO {
    private UUID billID;
    private Integer quantity;
    private Double price;
    private Integer creator;
    private LocalDateTime createDate;
    private Integer updater;
    private LocalDateTime updateDate;
    private Boolean isStatus;
    private UsersResponseDTO userDTO;
    private VoucherResponseDTO voucherDTO;
    private Set<Bill_ProductResponseDTO> billProductDTOs;

    public BillResponseDTO(Bill bill) {
        if(bill.getId() != null)
            this.billID = bill.getId();
        this.quantity = bill.getQuantity();
        this.price = bill.getPrice();
        this.creator = bill.getCreator();
        this.createDate = bill.getCreateDate();
        this.updater = bill.getUpdater();
        this.updateDate = bill.getUpdateDate();
        this.isStatus = bill.getIsStatus();
        if(bill.getUser() != null)
            this.userDTO = convertUser(bill.getUser());
        if(bill.getVoucher() != null)
            this.voucherDTO = new VoucherResponseDTO(bill.getVoucher());
        if(!bill.getBill_products().isEmpty())
            this.billProductDTOs = convertBillProductDTOs(bill.getBill_products());
    }

    private UsersResponseDTO convertUser(Users user) {
        UsersResponseDTO userDTO = new UsersResponseDTO();
        if(user.getId() != null)
            userDTO.setId(user.getId());
        userDTO.setAddress(user.getAddress());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhone());
        userDTO.setName(user.getName());
        userDTO.setImageURL(user.getImageURL());
        return userDTO;
    }

    private Set<Bill_ProductResponseDTO> convertBillProductDTOs(Set<Bill_Product> billProducts) {
        Set<Bill_ProductResponseDTO> billProductDTOs = new HashSet<>();
        for(Bill_Product billProduct : billProducts) {
            Bill_ProductResponseDTO billProductDTO = new Bill_ProductResponseDTO(billProduct);
            billProductDTOs.add(billProductDTO);
        }
        return billProductDTOs;
    }
}
