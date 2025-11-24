package com.farmaceutica.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
        @NotBlank(message = "El nombre de usuario es obligatorio") String nombreUsuario,

        @NotBlank(message = "La contraseña es obligatoria") String contrasena) {
}
