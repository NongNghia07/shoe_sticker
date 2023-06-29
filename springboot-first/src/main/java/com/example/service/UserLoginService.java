package com.example.service;

import com.example.dto.UserLoginDTO;

import java.util.List;

public interface UserLoginService {
    List<UserLoginDTO> findAll();
}
