package com.farmaceutica.distribucion.repository;

import com.farmaceutica.distribucion.model.IncidenciaTransporte;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidenciaTransporteRepository extends JpaRepository<IncidenciaTransporte, Integer> {
  List<IncidenciaTransporte> findByIdVehiculo_Id(Integer idVehiculo);
}