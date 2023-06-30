package com.example.service;

import com.example.dto.MediaDTO;

import java.util.List;

public interface MediaService {

    List<MediaDTO> findAll();

    MediaDTO create(MediaDTO mediaDTO);

    MediaDTO update(MediaDTO mediaDTO);

    MediaDTO findById(Long id);

    void setStatusFalse(Long id);


}
