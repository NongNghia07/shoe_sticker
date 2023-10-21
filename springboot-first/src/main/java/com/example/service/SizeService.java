package com.example.service;

import com.example.dto.SizeDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SizeService {

    List<SizeDTO> findAll();

    Page<SizeDTO> findAllPage(Integer size, Integer page);

    List<SizeDTO> searchAllByName(String keyword);

    SizeDTO save(SizeDTO sizeDTO);

    SizeDTO findById(Long id);

    void setStatusFalse(Long id);

}
