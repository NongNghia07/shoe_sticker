package com.example.service.impl;

import com.example.dto.response.UserDataDTO;
import com.example.entity.UserData;
import com.example.exception.ApiRequestException;
import com.example.repository.UserDataRepository;
import com.example.service.UserDataService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserDataServiceImpl implements UserDataService {

    private final UserDataRepository userDataRepository;
    private final ModelMapper modelMapper;


    @Autowired
    public UserDataServiceImpl(UserDataRepository userDataRepository, ModelMapper modelMapper) {
        this.userDataRepository = userDataRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<UserDataDTO> findAll() {
        return this.userDataRepository.findAll().stream().map(o -> modelMapper.map(o, UserDataDTO.class)).collect(Collectors.toList());
    }

    @Override
    public UserDataDTO create(UserDataDTO userDataDTO) {
        UserData userData = modelMapper.map(userDataDTO, UserData.class);
        userData.setCreated(userDataDTO.getUserId());
        userData.setCreatedDate(LocalDateTime.now());
        this.userDataRepository.save(userData);
        userDataDTO.setCreated(userData.getCreated());
        userDataDTO.setCreatedDate(userData.getCreatedDate());
        return userDataDTO;
    }

    @Override
    public UserDataDTO update(UserDataDTO userDataDTO) {
        UserData userData = modelMapper.map(userDataDTO, UserData.class);
        userData.setUpdated(userDataDTO.getUserId());
        userData.setUpdatedDate(LocalDateTime.now());
        this.userDataRepository.save(userData);
        userDataDTO.setUpdated(userData.getUpdated());
        userDataDTO.setUpdatedDate(userData.getUpdatedDate());
        return userDataDTO;
    }

    @Override
    public UserDataDTO findById(Long id) {
        return modelMapper.map(this.userDataRepository.findById(id).orElseThrow(() -> new ApiRequestException("Not Found user")), UserDataDTO.class);
    }

    @Override
    public void setStatusFalse(Long id) {
        UserData userData = this.userDataRepository.findById(id).orElseThrow();
        this.userDataRepository.save(userData);
    }
}
