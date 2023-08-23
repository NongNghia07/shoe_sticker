package com.example.service;

import com.example.dto.MediaDTO;

import java.util.List;

public interface MediaService {

    List<MediaDTO> findAll();

    MediaDTO create(MediaDTO mediaDTO);

    List<MediaDTO> createAll(List<MediaDTO> mediaDTOS);

    List<MediaDTO> updateAll(List<MediaDTO> mediaDTOS);

    MediaDTO update(MediaDTO mediaDTO);

    MediaDTO findById(Long id);

    List<MediaDTO> findAllByProductDataID(Integer id);

    void setStatusFalse(Long id);


}
