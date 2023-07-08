package com.example.service.impl;

import com.example.dto.MediaDTO;
import com.example.entity.Media;
import com.example.repository.MediaRepository;
import com.example.service.MediaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MediaServiceImpl implements MediaService {
    private final MediaRepository mediaRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public MediaServiceImpl(MediaRepository mediaRepository, ModelMapper modelMapper) {
        this.mediaRepository = mediaRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<MediaDTO> findAll() {
        return this.mediaRepository.findAll().stream().map(o -> modelMapper.map(o, MediaDTO.class)).collect(Collectors.toList());
    }

    @Override
    public MediaDTO create(MediaDTO mediaDTO) {
        Media media = modelMapper.map(mediaDTO, Media.class);
        this.mediaRepository.save(media);
        mediaDTO.setId(media.getId());
        return mediaDTO;
    }

    @Override
    public List<MediaDTO> createAll(List<MediaDTO> mediaDTOS) {
        List<Media> medias = mediaDTOS.stream().map(o -> modelMapper.map(o, Media.class)).collect(Collectors.toList());
        this.mediaRepository.saveAll(medias);
        return mediaDTOS;
    }

    @Override
    public MediaDTO update(MediaDTO mediaDTO) {
        Media media = modelMapper.map(mediaDTO, Media.class);
        this.mediaRepository.save(media);
        return mediaDTO;
    }

    @Override
    public MediaDTO findById(Long id) {
        return modelMapper.map(this.mediaRepository.findById(id).orElseThrow(), MediaDTO.class);
    }

    @Override
    public void setStatusFalse(Long id) {
        Media media = this.mediaRepository.findById(id).orElseThrow();
        media.setStatus((byte) 0);
        this.mediaRepository.save(media);
    }
}
