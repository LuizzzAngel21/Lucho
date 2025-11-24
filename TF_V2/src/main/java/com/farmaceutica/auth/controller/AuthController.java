package com.farmaceutica.auth.controller;

import com.farmaceutica.auth.dto.LoginRequestDto;
import com.farmaceutica.auth.dto.LoginResponseDto;
import com.farmaceutica.core.model.Usuario;
import com.farmaceutica.core.repository.UsuarioRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequest) {
        // 1. Buscar usuario
        Usuario usuario = usuarioRepository.findByNombreUsuario(loginRequest.nombreUsuario())
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Credenciales inválidas"));
        }

        // 2. Validar contraseña (SIMPLE - Texto plano por ahora, según entorno dev)
        if (!usuario.getContrasena().equals(loginRequest.contrasena())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Credenciales inválidas"));
        }

        // 3. Verificar si está activo
        if (!Boolean.TRUE.equals(usuario.getActivo())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("success", false, "message", "Usuario inactivo"));
        }

        // 4. Generar respuesta
        String rol = (usuario.getIdRol() != null) ? usuario.getIdRol().getNombreRol() : "SIN_ROL";

        LoginResponseDto response = new LoginResponseDto(
                usuario.getId(),
                usuario.getNombreUsuario(),
                rol,
                "dummy-token-xyz" // Token simulado
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login exitoso",
                "data", response));
    }
}
