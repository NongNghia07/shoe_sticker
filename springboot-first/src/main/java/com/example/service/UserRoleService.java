package com.example.service;

import com.example.dto.response.UserRolesDTO;

import java.util.List;

public interface UserRoleService {

    List<UserRolesDTO> findAll();

    UserRolesDTO create(UserRolesDTO userRolesDTO);

    UserRolesDTO update(UserRolesDTO userRolesDTO);

    void setStatusFalse(Long id);

    UserRolesDTO findById(Long id);
}
