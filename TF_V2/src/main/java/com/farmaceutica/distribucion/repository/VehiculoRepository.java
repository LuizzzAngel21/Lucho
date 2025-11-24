package com.farmaceutica.distribucion.repository;

import com.farmaceutica.distribucion.model.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Integer> {
    List<Vehiculo> findByEstado(String estado);
}