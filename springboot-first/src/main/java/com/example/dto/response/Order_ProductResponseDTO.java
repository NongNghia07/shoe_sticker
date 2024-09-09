package com.example.dto.response;

import com.example.entity.Order_Product;
import com.example.service.ProductService;
import lombok.*;

import java.util.UUID;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Order_ProductResponseDTO {
    private UUID orderID;
    private UUID productID;
    private String productName;
    private Double productPrice;
    private String productImageURL;
    private Integer quantity;
    private Integer productQuantity;

    public Order_ProductResponseDTO(Order_Product order_product) {
        if(order_product.getOrderID() != null)
            this.orderID = order_product.getOrderID();
        if(order_product.getProductID() != null)
            this.productID = order_product.getProductID();
        this.productImageURL = order_product.getProduct().getImageURL();
        this.productName = order_product.getProduct().getName();
        this.quantity = order_product.getQuantity();
        this.productQuantity = order_product.getProduct().getQuantity();
        if(!order_product.getProduct().getPrice_products().isEmpty())
            this.productPrice  = ProductService.getProductPrice(this.productID, order_product.getProduct().getPrice_products());
    }
}
