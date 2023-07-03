package com.example.restcontroller;

import com.example.dto.SizeDTO;
import com.example.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/size")
public class SizeRestController {

    private final SizeService sizeService;

    @Autowired
    public SizeRestController(SizeService sizeService) {
        this.sizeService = sizeService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.sizeService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.sizeService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody SizeDTO sizeDTO) {
        return ResponseEntity.ok().body(this.sizeService.create(sizeDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody SizeDTO sizeDTO) {
        return ResponseEntity.ok().body(this.sizeService.update(sizeDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.sizeService.setStatusFalse(id);
    }
}
