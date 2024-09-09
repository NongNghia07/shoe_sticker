package com.example.dto.response;


import com.example.entity.Bill_Product;
import com.example.entity.ImportTicket_Product;
import com.example.entity.Order_Product;
import com.example.entity.Products;
import com.example.service.ProductService;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductsResponseDTO {
    private UUID id;
    private String name;
    private Integer quantity;
    private String color;
    private String size;
    private String brand;
    private String description;
    private Integer creator;
    private LocalDateTime createDate;
    private Integer updater;
    private LocalDateTime updateDate;
    private String image_URL;
    private Boolean isStatus = true;
    private Double price;

    private CategoriesResponseDTO category;
    private Set<ImportTicket_ProductResponseDTO> importTicketProductDTOs;
    private Set<Bill_ProductResponseDTO> billProductDTOs;
    private Set<Order_ProductResponseDTO> orderProductDTOs;

    public ProductsResponseDTO(Products products) {
        if(products.getId() != null)
            this.id = products.getId();
        this.name = products.getName();
        this.quantity = products.getQuantity();
        this.color = products.getColor();
        this.size = products.getSize();
        this.brand = products.getBrand();
        this.description = products.getDescription();
        this.image_URL = products.getImageURL();
        this.isStatus = products.getIsStatus();
        this.price = ProductService.getProductPrice(this.id, products.getPrice_products());
        this.category = new CategoriesResponseDTO(products.getCategories());

        if(!products.getImportTicketProducts().isEmpty())
            this.importTicketProductDTOs = convertImportTicketProductDTOs(products.getImportTicketProducts());
        if(!products.getBillProducts().isEmpty())
            this.billProductDTOs = convertBillProductDTOs(products.getBillProducts());
        if(!products.getOrderProducts().isEmpty())
            this.orderProductDTOs = convertOrderProductDTOs(products.getOrderProducts());
    }

    private Set<ImportTicket_ProductResponseDTO> convertImportTicketProductDTOs(Set<ImportTicket_Product> importTicketProducts) {
        Set<ImportTicket_ProductResponseDTO> importTicketProductDTOs = new HashSet<>();
        for (ImportTicket_Product importTicketProduct : importTicketProducts) {
            ImportTicket_ProductResponseDTO importTicketProductDTO = new ImportTicket_ProductResponseDTO(importTicketProduct);
            importTicketProductDTOs.add(importTicketProductDTO);
        }
        return importTicketProductDTOs;
    }

    private Set<Bill_ProductResponseDTO> convertBillProductDTOs(Set<Bill_Product> billProducts) {
        Set<Bill_ProductResponseDTO> billProductDTOs = new HashSet<>();
        for (Bill_Product billProduct : billProducts) {
            Bill_ProductResponseDTO billProductDTO = new Bill_ProductResponseDTO(billProduct);
            billProductDTOs.add(billProductDTO);
        }
        return billProductDTOs;
    }

    private Set<Order_ProductResponseDTO> convertOrderProductDTOs(Set<Order_Product> orderProducts) {
        Set<Order_ProductResponseDTO> orderProductDTOs = new HashSet<>();
        for (Order_Product orderProduct : orderProducts) {
            Order_ProductResponseDTO orderProductDTO = new Order_ProductResponseDTO(orderProduct);
            orderProductDTOs.add(orderProductDTO);
        }
        return orderProductDTOs;
    }
}
