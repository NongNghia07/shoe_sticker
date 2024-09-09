package com.example.restcontroller;

import com.example.dto.response.UserLoginDTO;
import com.example.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/userLogin")
public class UserLoginRestController {

    private final UserLoginService userLoginService;

    @Autowired
    public UserLoginRestController(UserLoginService userLoginService) {
        this.userLoginService = userLoginService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        List<UserLoginDTO> lstUserLoginDTO = this.userLoginService.findAll();
        return ResponseEntity.ok().body(lstUserLoginDTO);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        UserLoginDTO userLoginDTO = this.userLoginService.findById(id);
        return ResponseEntity.ok().body(userLoginDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody @Valid UserLoginDTO userLoginDTO) {
        return ResponseEntity.ok().body(this.userLoginService.create(userLoginDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody UserLoginDTO userLoginDTO) {
        return ResponseEntity.ok().body(this.userLoginService.update(userLoginDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void setStatusFalse(@PathVariable("id") Long id) {
        this.userLoginService.setStatusFalse(id);
    }
}
