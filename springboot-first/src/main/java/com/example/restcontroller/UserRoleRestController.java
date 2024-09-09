package com.example.restcontroller;

import com.example.dto.response.UserRolesDTO;
import com.example.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/userRole")
public class UserRoleRestController {

    private final UserRoleService userRoleService;

    @Autowired
    public UserRoleRestController(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.userRoleService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.userRoleService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody UserRolesDTO userRolesDTO) {
        return ResponseEntity.ok().body(this.userRoleService.create(userRolesDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody UserRolesDTO userRolesDTO) {
        return ResponseEntity.ok().body(this.userRoleService.update(userRolesDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {

    }
}
