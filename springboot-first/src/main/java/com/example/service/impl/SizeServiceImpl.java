package com.example.service.impl;

import com.example.dto.SizeDTO;
import com.example.entity.Size;
import com.example.repository.SizeRepository;
import com.example.service.SizeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SizeServiceImpl implements SizeService {

    private final SizeRepository sizeRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public SizeServiceImpl(SizeRepository sizeRepository, ModelMapper modelMapper) {
        this.sizeRepository = sizeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SizeDTO> findAll() {
        return this.sizeRepository.findAll().stream().map(o -> modelMapper.map(o, SizeDTO.class)).collect(Collectors.toList());
    }

    @Override
    public SizeDTO save(SizeDTO sizeDTO) {
        Size size = modelMapper.map(sizeDTO, Size.class);
        size.setStatus((byte) 1);
        this.sizeRepository.save(size);
        return sizeDTO;
    }

    @Override
    public SizeDTO findById(Long id) {
        return modelMapper.map(this.sizeRepository.findById(id).orElseThrow(), SizeDTO.class);
    }

    @Override
    public void setStatusFalse(Long id) {
        Size size = this.sizeRepository.findById(id).orElseThrow();
        size.setStatus((byte) 0);
        this.sizeRepository.save(size);
    }
}
