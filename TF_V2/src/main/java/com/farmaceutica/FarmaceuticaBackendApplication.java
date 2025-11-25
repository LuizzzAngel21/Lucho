package com.farmaceutica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;
// 1. Agregamos estos dos imports nuevos:
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableTransactionManagement
public class FarmaceuticaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FarmaceuticaBackendApplication.class, args);
    }

    // 2. Agregamos este bloque al final, antes de la última llave }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}