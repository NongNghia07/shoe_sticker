package com.example.restcontroller;

import com.example.dto.RolesDTO;
import com.example.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/role")
public class RoleRestController {

    private final RoleService roleService;

    @Autowired
    public RoleRestController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(this.roleService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(this.roleService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RolesDTO rolesDTO) {
        return ResponseEntity.ok().body(this.roleService.create(rolesDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody RolesDTO rolesDTO) {
        return ResponseEntity.ok().body(this.roleService.update(rolesDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.roleService.setStatusFalse(id);
    }
}
