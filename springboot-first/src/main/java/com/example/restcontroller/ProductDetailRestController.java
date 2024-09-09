package com.example.restcontroller;

import com.example.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/productDetail")
public class ProductDetailRestController {

    private final ProductDetailService productDetailService;

    @Autowired
    public ProductDetailRestController(ProductDetailService productDetailService) {
        this.productDetailService = productDetailService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.productDetailService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.productDetailService.findById(id));
    }

    @GetMapping("/findAllByProductDataId")
    public ResponseEntity<?> findAllByProductDataId(
            @RequestParam(name = "status", defaultValue = "1") Integer status,
            @RequestParam(name = "id", defaultValue = "0") Integer id) {
        return ResponseEntity.ok().body(this.productDetailService.findAllByProductDataId(status, id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProductDetailDTO productDetailDTO) {
        return ResponseEntity.ok().body(this.productDetailService.create(productDetailDTO));
    }

    @PostMapping("/createAll")
    public ResponseEntity<?> createAll(@RequestBody List<ProductDetailDTO> productDetailDTOS) {
        return ResponseEntity.ok().body(this.productDetailService.createAll(productDetailDTOS));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody ProductDetailDTO productDetailDTO) {
        return ResponseEntity.ok().body(this.productDetailService.update(productDetailDTO));
    }

    @PostMapping("/updateAll")
    public ResponseEntity<?> updateAll(@RequestBody List<ProductDetailDTO> productDetailDTOS,
                                       @RequestParam(name = "status", defaultValue = "1") Integer status
    ) {
        return ResponseEntity.ok().body(this.productDetailService.updateAll(productDetailDTOS, status));
    }

    @PostMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.productDetailService.setStatusFalse(id);
    }


    @PostMapping("/deleteAllByProductData/{id}")
    public void setAllStatusFalse(@PathVariable("id") Integer id) {
        this.productDetailService.setAllStatusFalse(id);
    }
}
