package com.farmaceutica.core.repository;

import com.farmaceutica.core.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    java.util.Optional<Usuario> findByNombreUsuario(String nombreUsuario);
}