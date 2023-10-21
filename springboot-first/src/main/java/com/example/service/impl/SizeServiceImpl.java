package com.example.service.impl;

import com.example.dto.SizeDTO;
import com.example.entity.Size;
import com.example.exception.ApiRequestException;
import com.example.repository.SizeRepository;
import com.example.service.SizeService;
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
        return this.sizeRepository.findAllByStatusOrderByIdDesc(1).stream().map(o -> modelMapper.map(o, SizeDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Page<SizeDTO> findAllPage(Integer sizeNumber, Integer page) {
        Pageable pageable = PageRequest.of(page, sizeNumber);
        Page<Size> sizePage = this.sizeRepository.findAllPageByStatusOrderByIdDesc(1,pageable);
        Page<SizeDTO> sizeDTOPage = sizePage.map(new Function<Size, SizeDTO>() {
            @Override
            public SizeDTO apply(Size size) {
                SizeDTO sizeDTO = new SizeDTO();
                sizeDTO = modelMapper.map(size, SizeDTO.class);
                return sizeDTO;
            }
        });
        return sizeDTOPage;
    }

    @Override
    public List<SizeDTO> searchAllByName(String keyword) {
        return this.sizeRepository.findAllByNameAndStatusOrderByIdDesc(keyword,1).stream().map(o -> modelMapper.map(o, SizeDTO.class)).collect(Collectors.toList());
    }

    @Override
    public SizeDTO save(SizeDTO sizeDTO) {
        Size size = modelMapper.map(sizeDTO, Size.class);
        Size sizeOld = this.sizeRepository.findByName(size.getName());
        if(sizeOld != null){
            if(sizeOld.getStatus() == 1) throw new ApiRequestException("Tên đã tồn tại");
        }
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
