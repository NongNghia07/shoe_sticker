package com.example.service;

import com.example.dto.UserLoginDTO;

import java.util.List;

public interface UserLoginService {
    List<UserLoginDTO> findAll();

    UserLoginDTO create(UserLoginDTO userLoginDTO);

    UserLoginDTO update(UserLoginDTO userLoginDTO);

    void setStatusFalse(Long id);

    UserLoginDTO findById(Long id);
}
