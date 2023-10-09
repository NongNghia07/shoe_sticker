package com.example;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.auth.AuthenticationService;
import com.example.auth.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.example.enums.Role.ADMIN;
import static com.example.enums.Role.MANAGER;

@SpringBootApplication
//@ComponentScan(basePackages = {"com.example"})
//@EnableJpaRepositories("com.example.*")
//@ComponentScan(basePackages = {"com.example.*"})
//@EntityScan("com.example.*")
public class SpringbootFirstApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootFirstApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

//    @Bean
//    public CommandLineRunner commandLineRunner(
//            AuthenticationService service
//    ) {
//        return args -> {
//            var admin = RegisterRequest.builder()
//                    .firstname("Admin")
//                    .lastname("Admin")
//                    .userName("admin")
//                    .password("123")
//                    .role(ADMIN)
//                    .build();
//            System.out.println("Admin token: " + service.register(admin).getAccessToken());
//
//            var manager = RegisterRequest.builder()
//                    .firstname("Staff")
//                    .lastname("Staff")
//                    .userName("staff")
//                    .password("123")
//                    .role(MANAGER)
//                    .build();
//            System.out.println("Manager token: " + service.register(max1nager).getAccessToken());
//
//        };
//    }
}
