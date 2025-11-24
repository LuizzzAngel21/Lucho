package com.farmaceutica.compras.repository;

import com.farmaceutica.compras.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProveedorRepository extends JpaRepository<Proveedor, Integer> {
    /**
     * Busca un Proveedor por su RUC (que es unique).
     * Se usa para validar si un proveedor ya existe antes de crearlo.
     */
    Optional<Proveedor> findByRuc(String ruc);
}