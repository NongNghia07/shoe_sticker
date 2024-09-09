package com.example.service;

import java.util.List;

public interface RoleService {

    List<RolesDTO> findAll();

    RolesDTO create(RolesDTO rolesDTO);

    RolesDTO update(RolesDTO rolesDTO);

    RolesDTO findById(Long id);

    void setStatusFalse(Long id);
}
