package com.farmaceutica.almacenamiento.repository;

import com.farmaceutica.almacenamiento.model.LoteProducto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoteProductoRepository extends JpaRepository<LoteProducto, Integer> {
  Optional<LoteProducto> findByNumeroLote(String numeroLote);
}