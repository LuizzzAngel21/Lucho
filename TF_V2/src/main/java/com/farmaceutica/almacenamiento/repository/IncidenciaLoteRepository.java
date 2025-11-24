package com.farmaceutica.almacenamiento.repository;

import com.farmaceutica.almacenamiento.model.IncidenciaLote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidenciaLoteRepository extends JpaRepository<IncidenciaLote, Integer> {
    List<IncidenciaLote> findByIdLote_Id(Integer idLote);
}