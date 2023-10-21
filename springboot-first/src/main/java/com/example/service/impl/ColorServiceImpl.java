package com.example.service.impl;

import com.example.dto.ColorDTO;
import com.example.entity.Color;
import com.example.exception.ApiRequestException;
import com.example.repository.ColorRepository;
import com.example.service.ColorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
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
        return this.colorRepository.findAllByStatusOrderByIdDesc(1).stream().map(o -> modelMapper.map(o, ColorDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Page<ColorDTO> findAllPage(Integer size, Integer page) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Color> colorPage = this.colorRepository.findAllPageByStatusOrderByIdDesc(1, pageable);
        Page<ColorDTO> colorDTOPage = colorPage.map(new Function<Color, ColorDTO>() {
            @Override
            public ColorDTO apply(Color color) {
                ColorDTO colorDTO = new ColorDTO();
                colorDTO = modelMapper.map(color, ColorDTO.class);
                return colorDTO;
            }
        });
        return colorDTOPage;
    }

    @Override
    public List<ColorDTO> searchAllByName(String keyword) {
        return this.colorRepository.findAllByNameAndStatusOrderByIdDesc(keyword,1).stream().map(o -> modelMapper.map(o, ColorDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ColorDTO save(ColorDTO colorDTO) {
        Color color = modelMapper.map(colorDTO, Color.class);
        Color colorOld = this.colorRepository.findByName(color.getName());
        if(colorOld != null){
            if(colorOld.getStatus() == 1){
                throw new ApiRequestException("Tên đã tồn tại");
            }
        }
        color.setStatus((byte) 1);
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
