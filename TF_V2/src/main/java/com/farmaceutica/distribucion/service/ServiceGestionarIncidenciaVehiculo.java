// Ubicación: com/farmaceutica/distribucion/service/ServiceGestionarIncidenciaVehiculo.java

package com.farmaceutica.distribucion.service;

import com.farmaceutica.distribucion.dto.IncidenciaTransporteCreateDto;
import com.farmaceutica.distribucion.dto.IncidenciaTransporteDto;
import java.util.List;

public interface ServiceGestionarIncidenciaVehiculo {

    /**
     * Registra una nueva incidencia de transporte.
     * @param dto DTO con los detalles de la incidencia.
     * @return DTO de la incidencia creada.
     */
    IncidenciaTransporteDto registrarIncidencia(IncidenciaTransporteCreateDto dto);

    /**
     * Consulta todas las incidencias de un vehículo.
     * @param idVehiculo El ID del vehículo.
     * @return Lista de DTOs de incidencias.
     */
    List<IncidenciaTransporteDto> consultarIncidenciasPorVehiculo(Integer idVehiculo);
}