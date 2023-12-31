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

    @GetMapping("/findAllPage")
    public ResponseEntity<?> findAllPage(
            @RequestParam(name = "size", defaultValue = "7") Integer size,
            @RequestParam(name = "page", defaultValue = "0") Integer page
    ) {
        return ResponseEntity.ok().body(this.productDataService.findAllPage(size, page));
    }

    @GetMapping("/searchAllByName")
    public ResponseEntity<?> searchAllByName(
            @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return ResponseEntity.ok().body(this.productDataService.searchAllByName(keyword));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProductDataDTO productDataDTO) {
        return ResponseEntity.ok().body(this.productDataService.create(productDataDTO));
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody ProductDataDTO productDataDTO) {
        return ResponseEntity.ok().body(this.productDataService.update(productDataDTO));
    }

    @PostMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id, @RequestParam(name = "userId", defaultValue = "0") Integer userId) {
        this.productDataService.setStatusFalse(id, userId);
    }
}
