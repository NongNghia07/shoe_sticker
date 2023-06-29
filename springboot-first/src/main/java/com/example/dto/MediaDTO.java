package com.example.dto;

import lombok.Data;

@Data
public class MediaDTO {
    private Integer id;
    private Integer productDataId;
    private Integer productDetailId;
    private Byte type;
    private String url;
    private Byte status;

}
