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

    @GetMapping("/findAllPage")
    public ResponseEntity<?> findAllPage(@RequestParam(name = "size", defaultValue = "7") Integer size,
                                      @RequestParam(name = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok().body(this.colorService.findAllPage(size, page));
    }

    @GetMapping("/searchAllByName")
    public ResponseEntity<?> searchAllByName(
                                @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return ResponseEntity.ok().body(this.colorService.searchAllByName(keyword));
    }

    @PostMapping("/save")
    public ResponseEntity<?> create(@RequestBody ColorDTO colorDTO) {
        return ResponseEntity.ok().body(this.colorService.save(colorDTO));
    }

    @PostMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.colorService.setStatusFalse(id);
    }
}
