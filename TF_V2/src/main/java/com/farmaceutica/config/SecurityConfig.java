package com.farmaceutica.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Le dice a Spring que esta es una clase de configuración
@EnableWebSecurity // Habilita la configuración de seguridad web de Spring
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. DESACTIVAR CSRF
                // (Cross-Site Request Forgery)
                // Es necesario para que funcionen las peticiones POST/PUT/DELETE
                // desde Postman sin un token especial.
                .csrf(AbstractHttpConfigurer::disable)

                // 2. CONFIGURAR REGLAS DE AUTORIZACIÓN
                .authorizeHttpRequests(auth -> auth

                                // ¡ESTA ES LA LÍNEA CLAVE PARA DESARROLLO!
                                // .anyRequest().permitAll() significa:
                                // "Permitir TODAS (any) las peticiones (Request) SIN autenticación."
                                .anyRequest().permitAll()

                /* --- NOTA PARA EL FUTURO ---
                Cuando quieras activar la seguridad, cambiarás esa línea por:

                .requestMatchers("/api/auth/**").permitAll() // Permitir login
                .anyRequest().authenticated() // Proteger todo lo demás

                --------------------------
                */
                );

        return http.build();
    }
}