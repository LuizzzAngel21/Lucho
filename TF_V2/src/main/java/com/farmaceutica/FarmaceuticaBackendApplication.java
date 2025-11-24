package com.farmaceutica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement; // <-- 1. IMPORTA ESTO

@SpringBootApplication
@EnableTransactionManagement // <-- 2. AÑADE ESTA LÍNEA
public class FarmaceuticaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FarmaceuticaBackendApplication.class, args);
    }
}