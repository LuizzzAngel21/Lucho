package com.farmaceutica.compras.repository;

import com.farmaceutica.compras.model.OrdenCompra;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdenCompraRepository extends JpaRepository<OrdenCompra, Integer> {
  }