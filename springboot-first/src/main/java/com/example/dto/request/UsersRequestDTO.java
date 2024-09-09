package com.example.dto.request;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UsersRequestDTO {
    private UUID id;
    private String userName;
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDateTime dateOfBirth;
    private Integer CCCD;
    private Double tax;
    private String level;
    private String imageURL;
    private Boolean isStatus = true;
}
