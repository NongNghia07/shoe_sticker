package com.example.service.impl;

import com.example.dto.ColorDTO;
import com.example.entity.Color;
import com.example.repository.ColorRepository;
import com.example.service.ColorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColorServiceImpl implements ColorService {
    private final ColorRepository colorRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ColorServiceImpl(ColorRepository colorRepository, ModelMapper modelMapper) {
        this.colorRepository = colorRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ColorDTO> findAll() {
        return this.colorRepository.findAll().stream().map(o -> modelMapper.map(o, ColorDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ColorDTO create(ColorDTO colorDTO) {
        Color color = modelMapper.map(colorDTO, Color.class);
        this.colorRepository.save(color);
        colorDTO.setId(color.getId());
        return colorDTO;
    }

    @Override
    public ColorDTO update(ColorDTO colorDTO) {
        Color color = modelMapper.map(colorDTO, Color.class);
        this.colorRepository.save(color);
        return colorDTO;
    }

    @Override
    public ColorDTO findById(Long id) {
        return modelMapper.map(this.colorRepository.findById(id).orElseThrow(), ColorDTO.class);
    }

    @Override
    public void setStatusFalse(Long id) {
        Color color = this.colorRepository.findById(id).orElseThrow();
        color.setStatus((byte) 0);
        this.colorRepository.save(color);
    }
}
