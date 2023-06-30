package com.example.service.impl;

import com.example.dto.UserRolesDTO;
import com.example.entity.UserRoles;
import com.example.repository.UserRoleRepository;
import com.example.service.UserRoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleRepository userRoleRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, ModelMapper modelMapper) {
        this.userRoleRepository = userRoleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserRolesDTO> findAll() {
        return this.userRoleRepository.findAll().stream().map(o -> modelMapper.map(o, UserRolesDTO.class)).collect(Collectors.toList());
    }

    @Override
    public UserRolesDTO create(UserRolesDTO userRolesDTO) {
        UserRoles userRoles = modelMapper.map(userRolesDTO, UserRoles.class);
        this.userRoleRepository.save(userRoles);
        userRolesDTO.setId(userRoles.getId());
        return userRolesDTO;
    }

    @Override
    public UserRolesDTO update(UserRolesDTO userRolesDTO) {
        UserRoles userRoles = modelMapper.map(userRolesDTO, UserRoles.class);
        this.userRoleRepository.save(userRoles);
        return userRolesDTO;
    }

    @Override
    public void setStatusFalse(Long id) {

    }

    @Override
    public UserRolesDTO findById(Long id) {
        return modelMapper.map(this.userRoleRepository.findById(id).orElse(null), UserRolesDTO.class);
    }
}
