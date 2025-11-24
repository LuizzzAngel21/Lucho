package com.farmaceutica.almacenamiento.repository;

import com.farmaceutica.almacenamiento.model.Almacen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlmacenRepository extends JpaRepository<Almacen, Integer> {
  }