package com.farmaceutica.compras.repository;

import com.farmaceutica.compras.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}