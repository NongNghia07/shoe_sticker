package com.example.service.impl;

import com.example.dto.UserDataDTO;
import com.example.repository.UserDataRepository;
import com.example.service.UserDataService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public UserDataDTO create(UserDataDTO userData) {
        return null;
    }

    @Override
    public UserDataDTO findById(UserDataDTO userDataDTO) {
        return null;
    }

    @Override
    public void setStatus(Long id) {

    }
}
