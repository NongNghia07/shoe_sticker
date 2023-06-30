package com.example.service;

import com.example.dto.SizeDTO;

import java.util.List;

public interface SizeService {

    List<SizeDTO> findAll();

    SizeDTO create(SizeDTO sizeDTO);

    SizeDTO update(SizeDTO sizeDTO);

    SizeDTO findById(Long id);

    void setStatusFalse(Long id);
}
