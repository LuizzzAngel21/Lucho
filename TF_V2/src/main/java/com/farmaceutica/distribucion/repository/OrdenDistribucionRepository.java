package com.farmaceutica.distribucion.repository;

import com.farmaceutica.distribucion.model.OrdenDistribucion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdenDistribucionRepository extends JpaRepository<OrdenDistribucion, Integer> {
    List<OrdenDistribucion> findByEstado(String estado);
}