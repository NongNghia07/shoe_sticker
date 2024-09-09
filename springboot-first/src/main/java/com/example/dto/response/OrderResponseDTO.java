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
public class OrderResponseDTO {
    private UUID id;
    private Integer quantity;
    private Double price;
    private Integer creator;
    private LocalDateTime createDate;
    private String status;
    private UsersResponseDTO userDTO;
    private VoucherResponseDTO voucherDTO;
    private Set<Order_ProductResponseDTO> orderProductDTOs;

    public OrderResponseDTO(Order order) {
        if(order.getId() != null)
            this.id = order.getId();
        this.quantity = order.getQuantity();
        this.price = order.getPrice();
        this.creator = order.getCreator();
        this.createDate = order.getCreateDate();
        this.status = order.getStatus();
        if(order.getVoucher() != null)
            this.voucherDTO = new VoucherResponseDTO(order.getVoucher());
        if(order.getUser() != null)
            this.userDTO = convertUser(order.getUser());
        if(!order.getOrder_Products().isEmpty())
            this.orderProductDTOs = convertBillProductDTOs(order.getOrder_Products());
    }

    private UsersResponseDTO convertUser(Users user) {
        UsersResponseDTO userDTO = new UsersResponseDTO();
        userDTO.setId(user.getId());
        userDTO.setAddress(user.getAddress());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhone());
        userDTO.setName(user.getName());
        userDTO.setImageURL(user.getImageURL());
        return userDTO;
    }

    private Set<Order_ProductResponseDTO> convertBillProductDTOs(Set<Order_Product> orderProducts) {
        Set<Order_ProductResponseDTO> orderProductDTOs = new HashSet<>();
        for(Order_Product orderProduct : orderProducts) {
            Order_ProductResponseDTO orderProductDTO = new Order_ProductResponseDTO(orderProduct);
            orderProductDTOs.add(orderProductDTO);
        }
        return orderProductDTOs;
    }
}
