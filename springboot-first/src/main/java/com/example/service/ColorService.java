package com.example.service;

import com.example.dto.ColorDTO;

import java.util.List;

public interface ColorService {

    List<ColorDTO> findAll();

    ColorDTO create(ColorDTO colorDTO);

    ColorDTO update(ColorDTO colorDTO);

    ColorDTO findById(Long id);

    void setStatusFalse(Long id);
}
