package com.example.dto.response;

import com.example.entity.Cart;
import com.example.entity.Cart_Product;
import com.example.entity.Users;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDTO {
    private UUID id;
    private Double price;
    private Integer quantity;
    private Boolean isStatus;
    private UsersResponseDTO userDTO;
    private Set<Cart_ProductResponseDTO> cartProductDTOs;

    public CartResponseDTO(Cart cart){
        if(cart.getId()!=null)
            this.id = cart.getId();
        this.price  = cart.getPrice();
        this.quantity = cart.getQuantity();
        this.isStatus = cart.getIsStatus();
        if(cart.getUser()!=null)
            this.userDTO = convertUserDTO(cart.getUser());
        if(!cart.getCart_products().isEmpty())
            this.cartProductDTOs =convertCartProductDTO(cart.getCart_products());
    }

    private UsersResponseDTO convertUserDTO(Users user) {
        UsersResponseDTO userDTO = new UsersResponseDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setPhone(user.getPhone());
        return userDTO;
    }

    private Set<Cart_ProductResponseDTO> convertCartProductDTO(Set<Cart_Product> cartProducts) {
        Set<Cart_ProductResponseDTO> cartProductDTOs = new HashSet<>();
        for (Cart_Product cartProduct : cartProducts) {
            Cart_ProductResponseDTO cartProductDTO = new Cart_ProductResponseDTO(cartProduct);
            cartProductDTOs.add(cartProductDTO);
        }
        return cartProductDTOs;
    }
}
