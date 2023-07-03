package com.example.restcontroller;

import com.example.dto.CategoryDTO;
import com.example.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/category")
public class CategoryRestController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryRestController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.categoryService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.categoryService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok().body(this.categoryService.create(categoryDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok().body(this.categoryService.update(categoryDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.categoryService.setStatusFalse(id);
    }
}
