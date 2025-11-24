package com.farmaceutica.programacion.repository;

import com.farmaceutica.programacion.model.DetalleSolicitudCompra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleSolicitudCompraRepository extends JpaRepository<DetalleSolicitudCompra, Integer> {
    List<DetalleSolicitudCompra> findByIdSolicitud_Id(Integer id);
}