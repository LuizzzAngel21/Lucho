package com.farmaceutica.core.service;
import com.farmaceutica.core.model.Usuario;
import com.farmaceutica.core.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    public Map<String, Object> authenticate(String username, String password) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!usuario.getActivo()) {
            throw new RuntimeException("Usuario inactivo");
        }
        if (!passwordEncoder.matches(password, usuario.getContrasena())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        // Mapear rol según id_rol
        String role = switch (usuario.getIdRol().getId()) {
            case 1 -> "SUP_PROGRAMACION";  // Ajustar según tus roles
            case 2 -> "SUP_COMPRAS";
            case 3 -> "SUP_ALMACEN";
            case 4 -> "SUP_DISTRIBUCION";
            default -> "user";
        };
        return Map.of(
            "username", usuario.getNombreUsuario(),
            "email", usuario.getCorreo(),
            "role", role,
            "id", usuario.getId()
        );
    }
}