package com.farmaceutica.programacion.repository;

import com.farmaceutica.programacion.model.Requerimiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequerimientoRepository extends JpaRepository<Requerimiento, Integer> {
    List<Requerimiento> findByEstado(String estado);
}