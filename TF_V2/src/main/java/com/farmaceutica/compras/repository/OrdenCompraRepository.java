package com.farmaceutica.compras.repository;

import com.farmaceutica.compras.model.OrdenCompra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdenCompraRepository extends JpaRepository<OrdenCompra, Integer> {
  List<OrdenCompra> findByEstado(String estado);
}