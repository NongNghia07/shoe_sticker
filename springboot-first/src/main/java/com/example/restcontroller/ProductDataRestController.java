package com.example.restcontroller;

import com.example.dto.ProductDataDTO;
import com.example.service.ProductDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/productData")
public class ProductDataRestController {

    private final ProductDataService productDataService;

    @Autowired
    public ProductDataRestController(ProductDataService productDataService) {
        this.productDataService = productDataService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.productDataService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.productDataService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProductDataDTO productDataDTO) {
        return ResponseEntity.ok().body(this.productDataService.create(productDataDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody ProductDataDTO productDataDTO) {
        return ResponseEntity.ok().body(this.productDataService.update(productDataDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.productDataService.setStatusFalse(id);
    }
}
