package com.farmaceutica.programacion.repository;

import com.farmaceutica.programacion.model.SolicitudCompra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface SolicitudCompraRepository extends JpaRepository<SolicitudCompra, Integer> {
    List<SolicitudCompra> findByEstado(String estado);
    List<SolicitudCompra> findByEstadoIn(Collection<String> estados);
}