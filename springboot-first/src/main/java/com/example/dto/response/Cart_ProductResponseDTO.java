package com.example.dto.response;

import com.example.entity.Cart_Product;
import com.example.service.ProductService;
import lombok.*;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Cart_ProductResponseDTO {
    private UUID productID;
    private UUID cartID;
    private String productName;
    private Double productPrice;
    private Integer productQuantity;
    private Integer quantity;
    private Boolean productStatus;
    private String productImageURL;

    public Cart_ProductResponseDTO(Cart_Product cart_product) {
        if(cart_product.getCartID() != null)
            this.cartID = cart_product.getCartID();
        if(cart_product.getProductID() != null)
            this.productID = cart_product.getProductID();
        this.productQuantity = cart_product.getProduct().getQuantity();
        this.productStatus = cart_product.getProduct().getIsStatus();
        this.productImageURL = cart_product.getProduct().getImageURL();
        this.quantity = cart_product.getQuantity();
        this.productName = cart_product.getProduct().getName();
        if(!cart_product.getProduct().getPrice_products().isEmpty())
            this.productPrice = ProductService.getProductPrice(this.productID, cart_product.getProduct().getPrice_products());
    }
}
