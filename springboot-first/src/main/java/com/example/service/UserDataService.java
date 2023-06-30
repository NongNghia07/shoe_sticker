package com.example.service;

import com.example.dto.UserDataDTO;

import java.util.List;

public interface UserDataService {
    List<UserDataDTO> findAll();

    UserDataDTO create(UserDataDTO userDataDTO);

    UserDataDTO update(UserDataDTO userDataDTO);

    UserDataDTO findById(Long id);

    void setStatusFalse(Long id);
}
