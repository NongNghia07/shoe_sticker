package com.example.service.impl;

import com.example.entity.Roles;
import com.example.repository.RoleRepository;
import com.example.service.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository, ModelMapper modelMapper) {
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<RolesDTO> findAll() {
        return this.roleRepository.findAll().stream().map(o -> modelMapper.map(o, RolesDTO.class)).collect(Collectors.toList());
    }

    @Override
    public RolesDTO create(RolesDTO rolesDTO) {
        Roles roles = modelMapper.map(rolesDTO, Roles.class);
        this.roleRepository.save(roles);
        rolesDTO.setId(roles.getId());
        return rolesDTO;
    }

    @Override
    public RolesDTO update(RolesDTO rolesDTO) {
        Roles roles = modelMapper.map(rolesDTO, Roles.class);
        this.roleRepository.save(roles);
        return rolesDTO;
    }

    @Override
    public RolesDTO findById(Long id) {
        return modelMapper.map(this.roleRepository.findById(id).orElseThrow(), RolesDTO.class);
    }

    @Override
    public void setStatusFalse(Long id) {
        Roles roles = this.roleRepository.findById(id).orElseThrow();
        roles.setStatus((byte) 0);
        this.roleRepository.save(roles);
    }
}
