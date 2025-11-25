package com.farmaceutica.auth.controller;

import com.farmaceutica.auth.dto.LoginRequestDto;
import com.farmaceutica.auth.dto.LoginResponseDto;
import com.farmaceutica.core.model.Usuario;
import com.farmaceutica.core.repository.UsuarioRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

        private final UsuarioRepository usuarioRepository;
        private final PasswordEncoder passwordEncoder;

        @PostMapping("/login")
        public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequest) {
                System.out.println("LOGIN ATTEMPT: " + loginRequest.nombreUsuario());
                System.out.println("PASSWORD RECEIVED: " + loginRequest.contrasena());

                // 1. Buscar usuario
                Usuario usuario = usuarioRepository.findByNombreUsuario(loginRequest.nombreUsuario())
                                .orElse(null);

                if (usuario == null) {
                        System.out.println("USER NOT FOUND: " + loginRequest.nombreUsuario());
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                        .body(Map.of("success", false, "message", "Credenciales inválidas"));
                }
                
                System.out.println("USER FOUND. Stored Hash: " + usuario.getContrasena());

                // 2. Validar contraseña (BCrypt)
                boolean matches = passwordEncoder.matches(loginRequest.contrasena(), usuario.getContrasena());
                System.out.println("PASSWORD MATCH: " + matches);

                if (!matches) {
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

                System.out.println("LOGIN SUCCESS: User=" + usuario.getNombreUsuario() + ", Role=" + rol);

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

        @GetMapping("/init-admin")
        public ResponseEntity<?> initAdmin() {
                try {
                        if (usuarioRepository.findByNombreUsuario("admin").isEmpty()) {
                                Usuario admin = new Usuario();
                                admin.setNombreUsuario("admin");
                                admin.setContrasena(passwordEncoder.encode("admin123"));
                                admin.setActivo(true);
                                // Assuming Role 1 exists or setting it null for now if strict FK
                                // admin.setIdRol(...);
                                usuarioRepository.save(admin);
                                return ResponseEntity.ok("Admin user created");
                        }
                        return ResponseEntity.ok("Admin user already exists");
                } catch (Exception e) {
                        return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
                }
        }

        @GetMapping("/debug/users")
        public ResponseEntity<?> getAllUsers() {
                return ResponseEntity.ok(usuarioRepository.findAll());
        }

        @PostMapping("/debug/reset-password")
        public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> payload) {
                String username = payload.get("username");
                String newPassword = payload.get("password");
                Usuario user = usuarioRepository.findByNombreUsuario(username).orElse(null);
                if (user != null) {
                        user.setContrasena(passwordEncoder.encode(newPassword));
                        usuarioRepository.save(user);
                        return ResponseEntity.ok("Password updated for " + username);
                }
                return ResponseEntity.badRequest().body("User not found");
        }

        @GetMapping("/debug/status")
        public ResponseEntity<?> checkStatus(@RequestParam String username) {
                Usuario user = usuarioRepository.findByNombreUsuario(username).orElse(null);
                if (user != null) {
                        return ResponseEntity.ok(Map.of(
                                        "username", user.getNombreUsuario(),
                                        "active", user.getActivo(),
                                        "role", (user.getIdRol() != null) ? user.getIdRol().getNombreRol() : "null"));
                }
                return ResponseEntity.badRequest().body("User not found");
        }

        @PostMapping("/debug/activate")
        public ResponseEntity<?> activateUser(@RequestBody Map<String, String> payload) {
                String username = payload.get("username");
                Usuario user = usuarioRepository.findByNombreUsuario(username).orElse(null);
                if (user != null) {
                        user.setActivo(true);
                        usuarioRepository.save(user);
                        return ResponseEntity.ok("User activated: " + username);
                }
                return ResponseEntity.badRequest().body("User not found");
        }
}
