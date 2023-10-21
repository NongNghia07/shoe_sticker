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

    @GetMapping("/findAllPage")
    public ResponseEntity<?> findAllPage(@RequestParam(name = "size", defaultValue = "7") Integer size,
                                      @RequestParam(name = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok().body(this.categoryService.findAllPage(size,page ));
    }

    @GetMapping("/searchAllByName")
    public ResponseEntity<?> searchAllByName(
                            @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return ResponseEntity.ok().body(this.categoryService.searchAllByName(keyword));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok().body(this.categoryService.create(categoryDTO));
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok().body(this.categoryService.update(categoryDTO));
    }

    @PostMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.categoryService.setStatusFalse(id);
    }
}
