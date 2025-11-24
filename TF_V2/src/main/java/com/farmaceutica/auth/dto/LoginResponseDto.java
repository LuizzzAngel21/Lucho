package com.farmaceutica.auth.dto;

public record LoginResponseDto(
        Integer idUsuario,
        String nombreUsuario,
        String rol,
        String token // Placeholder for future JWT
) {
}
