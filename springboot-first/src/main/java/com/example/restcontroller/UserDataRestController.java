package com.example.restcontroller;

import com.example.dto.UserDataDTO;
import com.example.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/userData")
public class UserDataRestController {

    private final UserDataService userDataService;

    @Autowired
    public UserDataRestController(UserDataService userDataService) {
        this.userDataService = userDataService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.userDataService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.userDataService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody UserDataDTO userDataDTO) {
        return ResponseEntity.ok().body(this.userDataService.create(userDataDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody UserDataDTO userDataDTO) {
        return ResponseEntity.ok().body(this.userDataService.update(userDataDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.userDataService.setStatusFalse(id);
    }
}
