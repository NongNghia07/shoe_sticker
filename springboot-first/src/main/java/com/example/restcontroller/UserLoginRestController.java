package com.example.restcontroller;

import com.example.dto.UserLoginDTO;
import com.example.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            List<UserLoginDTO> lstUserLoginDTO = this.userLoginService.findAll();
            return ResponseEntity.ok().body(lstUserLoginDTO);
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        UserLoginDTO userLoginDTO = this.userLoginService.findById(id);
        return ResponseEntity.ok().body(userLoginDTO);
    }
}
