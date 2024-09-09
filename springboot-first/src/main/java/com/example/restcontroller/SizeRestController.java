package com.example.restcontroller;

import com.example.dto.response.SizeDTO;
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

    @GetMapping("/findAllPage")
    public ResponseEntity<?> findAllPage(@RequestParam(name = "size", defaultValue = "7") Integer size,
                                      @RequestParam(name = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok().body(this.sizeService.findAllPage(size, page));
    }

    @GetMapping("/searchAllByName")
    public ResponseEntity<?> searchAllByName(
            @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return ResponseEntity.ok().body(this.sizeService.searchAllByName(keyword));
    }

    @PostMapping("/save")
    public ResponseEntity<?> create(@RequestBody SizeDTO sizeDTO) {
        return ResponseEntity.ok().body(this.sizeService.save(sizeDTO));
    }

    @PostMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.sizeService.setStatusFalse(id);
    }
}
