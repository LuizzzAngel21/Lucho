package com.farmaceutica.almacenamiento.repository;

import com.farmaceutica.almacenamiento.model.MovimientoInventario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimientoInventarioRepository extends JpaRepository<MovimientoInventario, Integer> {
    List<MovimientoInventario> findByIdInventario_Id(Integer idInventario);
}