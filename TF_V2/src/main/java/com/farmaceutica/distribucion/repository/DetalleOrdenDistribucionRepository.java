package com.farmaceutica.distribucion.repository;

import com.farmaceutica.distribucion.model.DetalleOrdenDistribucion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleOrdenDistribucionRepository extends JpaRepository<DetalleOrdenDistribucion, Integer> {
    List<DetalleOrdenDistribucion> findByIdOrdenDist_Id(Integer idOrdenDist);
}