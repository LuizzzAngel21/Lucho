package com.farmaceutica.distribucion.repository;

import com.farmaceutica.distribucion.model.SeguimientoVehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface SeguimientoVehiculoRepository extends JpaRepository<SeguimientoVehiculo, Integer> {
    List<SeguimientoVehiculo> findByEstadoActualIn(Collection<String> estados);
}