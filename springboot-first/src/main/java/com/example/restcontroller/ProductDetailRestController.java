package com.example.restcontroller;

import com.example.dto.ProductDetailDTO;
import com.example.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/productDetail")
public class ProductDetailRestController {

    private final ProductDetailService productDetailService;

    @Autowired
    public ProductDetailRestController(ProductDetailService productDetailService) {
        this.productDetailService = productDetailService;
    }

    @GetMapping
    public ResponseEntity<?> create(@RequestBody ProductDetailDTO productDetailDTO) {
        return null;
    }

    @GetMapping("/test")
    public String test() {
        return "zxc";
    }
}
