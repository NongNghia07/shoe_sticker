package com.example.service.impl;

import com.example.dto.UserLoginDTO;
import com.example.entity.UserLogin;
import com.example.exception.ApiRequestException;
import com.example.repository.UserLoginRepository;
import com.example.service.UserLoginService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserLoginServiceImpl implements UserLoginService {
    private final UserLoginRepository userLoginRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserLoginServiceImpl(UserLoginRepository userLoginRepository, ModelMapper modelMapper) {
        this.userLoginRepository = userLoginRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserLoginDTO> findAll() {
        return this.userLoginRepository.findAll().stream().map(o -> modelMapper.map(o, UserLoginDTO.class)).collect(Collectors.toList());
    }

    @Override
    public UserLoginDTO create(UserLoginDTO userLoginDTO) {
        UserLogin userLogin = modelMapper.map(userLoginDTO, UserLogin.class);
        this.userLoginRepository.save(userLogin);
        userLoginDTO.setId(userLogin.getId());
        return userLoginDTO;
    }

    @Override
    public UserLoginDTO update(UserLoginDTO userLoginDTO) {
        UserLogin userLogin = modelMapper.map(userLoginDTO, UserLogin.class);
        this.userLoginRepository.save(userLogin);
        return userLoginDTO;
    }

    @Override
    public void setStatusFalse(Long id) {
        UserLogin userLogin = this.userLoginRepository.findById(id).orElseThrow();
        userLogin.setStatus((byte) 0);
        this.userLoginRepository.save(userLogin);
    }

    @Override
    public UserLoginDTO findById(Long id) {
        UserLogin userLogin = this.userLoginRepository.findById(id).orElseThrow(() -> new ApiRequestException("Not found with id: " + id));
        return modelMapper.map(userLogin, UserLoginDTO.class);
    }
}
