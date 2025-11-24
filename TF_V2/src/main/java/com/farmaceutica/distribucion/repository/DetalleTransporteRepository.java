package com.farmaceutica.distribucion.repository;

import com.farmaceutica.distribucion.model.DetalleTransporte;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleTransporteRepository extends JpaRepository<DetalleTransporte, Integer> {
    List<DetalleTransporte> findByIdSeguimiento_Id(Integer idSeguimiento);
}