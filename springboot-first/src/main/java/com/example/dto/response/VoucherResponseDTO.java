package com.example.dto.response;


import com.example.entity.Vouchers;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VoucherResponseDTO {
    private UUID id;
    private Integer quantity;

    private String code;

    private String discout;

    private Boolean type;

    private Boolean isStatus = false;

    public VoucherResponseDTO(Vouchers vouchers){
        if(vouchers.getId() != null)
            this.id = vouchers.getId();
        this.quantity = vouchers.getQuantity();
        this.code = vouchers.getCode();
        this.discout = vouchers.getDiscout();
        this.type = vouchers.getType();
        this.isStatus = vouchers.getIsStatus();
    }
}
