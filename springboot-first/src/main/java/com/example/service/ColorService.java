package com.example.service;

import com.example.dto.ColorDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ColorService {

    List<ColorDTO> findAll();

    Page<ColorDTO> findAllPage(Integer size, Integer page);

    List<ColorDTO> searchAllByName(String keyword);

    ColorDTO save(ColorDTO colorDTO);

    ColorDTO findById(Long id);

    void setStatusFalse(Long id);
}
