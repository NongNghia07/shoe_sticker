package com.example.dto.response.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize
@JsonDeserialize
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServiceResponseDTO<T> {
    private Integer code;
    private String message;
    private T data;

    public static <T> ServiceResponseDTO<T> success(HttpStatus status, T data) {
        return new ServiceResponseDTO<>(status.value(), "success", data);
    }

    public static <T> ServiceResponseDTO<T> error(HttpStatus status, T data) {
        return new ServiceResponseDTO<>(status.value(), "error", data);
    }

//    public ServiceResponseDTO<BillDTO> get(){
//        BillDTO dto = new BillDTO();
//        return ServiceResponseDTO.success(HttpStatus.OK, dto);
//    }
}
