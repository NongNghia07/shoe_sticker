package com.example.service;

import com.example.dto.UserDataDTO;

import java.util.List;

public interface UserDataService {
    List<UserDataDTO> findAll ();

    UserDataDTO create (UserDataDTO userData);

    UserDataDTO findById (UserDataDTO userDataDTO);
    void setStatus (Long id);
}
