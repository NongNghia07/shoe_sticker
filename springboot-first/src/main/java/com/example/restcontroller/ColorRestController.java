package com.example.restcontroller;

import com.example.dto.ColorDTO;
import com.example.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/color")
public class ColorRestController {

    private final ColorService colorService;

    @Autowired
    public ColorRestController(ColorService colorService) {
        this.colorService = colorService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.colorService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.colorService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<?> create(@RequestBody ColorDTO colorDTO) {
        return ResponseEntity.ok().body(this.colorService.save(colorDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.colorService.setStatusFalse(id);
    }
}
