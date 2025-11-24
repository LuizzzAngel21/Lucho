package com.farmaceutica.compras.repository;

import com.farmaceutica.compras.model.DetalleOrdenCompra;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleOrdenCompraRepository extends JpaRepository<DetalleOrdenCompra, Integer> {
  }