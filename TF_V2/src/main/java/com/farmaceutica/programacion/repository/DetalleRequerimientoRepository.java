package com.farmaceutica.programacion.repository;

import com.farmaceutica.programacion.model.DetalleRequerimiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleRequerimientoRepository extends JpaRepository<DetalleRequerimiento, Integer> {
    List<DetalleRequerimiento> findByIdRequerimiento_Id(Integer id);
}