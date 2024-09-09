package com.example.dto.response;

import com.example.entity.ImportTicket_Product;
import com.example.service.ProductService;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ImportTicket_ProductResponseDTO {
    private UUID productID;
    private UUID importTicketID;
    private String productName;
    private String productDescription;
    private Double productPrice;
    private String productImageURL;
    private String productCategoryName;
    private Integer quantity;
    private Integer productQuantity;
    private String productColor;

    public ImportTicket_ProductResponseDTO(ImportTicket_Product importTicket_Product) {
        if(importTicket_Product.getProductID() != null)
            this.productID = importTicket_Product.getProductID();
        if(importTicket_Product.getImportTicketID() != null)
            this.importTicketID = importTicket_Product.getImportTicketID();
        this.productColor = importTicket_Product.getProducts().getColor();
        this.productName = importTicket_Product.getProducts().getName();
        this.productDescription = importTicket_Product.getProducts().getDescription();
        this.productImageURL = importTicket_Product.getProducts().getImageURL();
        this.quantity = importTicket_Product.getQuantity();
        this.productQuantity = importTicket_Product.getProducts().getQuantity();
        this.productCategoryName = importTicket_Product.getProducts().getCategories().getName();
        if(!importTicket_Product.getProducts().getPrice_products().isEmpty())
            this.productPrice = ProductService.getProductPrice(this.productID, importTicket_Product.getProducts().getPrice_products());
    }
}
