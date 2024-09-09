package com.example.dto.response;

import com.example.entity.Bill_Product;
import com.example.service.ProductService;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Bill_ProductResponseDTO {
    private UUID billID;
    private UUID productID;
    private String productName;
    private String productDescription;
    private Double productPrice;
    private String productImageURL;
    private Integer quantity;
    private Integer productQuantity;
    private String productColor;
    private String productSize;
    private String productBrand;

    public Bill_ProductResponseDTO(Bill_Product bill_product) {
        if(bill_product.getBill().getId() != null)
            this.billID = bill_product.getBill().getId();
        if(bill_product.getProduct().getId() != null)
            this.productID = bill_product.getProduct().getId();
        this.productName = bill_product.getProduct().getName();
        this.productDescription = bill_product.getProduct().getDescription();
        this.productBrand = bill_product.getProduct().getBrand();
        this.productColor = bill_product.getProduct().getColor();
        this.productImageURL = bill_product.getProduct().getImageURL();
        this.productQuantity = bill_product.getProduct().getQuantity();
        this.productSize = bill_product.getProduct().getSize();
        this.quantity = bill_product.getQuantity();
        if(!bill_product.getProduct().getPrice_products().isEmpty())
            this.productPrice = ProductService.getProductPrice(this.productID, bill_product.getProduct().getPrice_products());
    }
}
