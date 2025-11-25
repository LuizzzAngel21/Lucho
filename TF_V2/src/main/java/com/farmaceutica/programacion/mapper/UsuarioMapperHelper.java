package com.farmaceutica.programacion.mapper;

import com.farmaceutica.core.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UsuarioMapperHelper {

    private final UsuarioRepository usuarioRepository;

    @Named("userIdToUsername")
    public String userIdToUsername(Integer userId) {
        if (userId == null) return "N/A";
        return usuarioRepository.findById(userId)
                .map(u -> u.getNombreUsuario())
                .orElse("N/A");
    }
}
