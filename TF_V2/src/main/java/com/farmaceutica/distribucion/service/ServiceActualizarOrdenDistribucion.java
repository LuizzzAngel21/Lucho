// Ubicación: com/farmaceutica/distribucion/service/ServiceActualizarOrdenDistribucion.java

package com.farmaceutica.distribucion.service;

import com.farmaceutica.distribucion.dto.DetalleOrdenDistribucionDto;
import com.farmaceutica.distribucion.dto.OrdenDistribucionDto;
import com.farmaceutica.distribucion.dto.SeguimientoCreateDto;
import com.farmaceutica.distribucion.dto.SeguimientoVehiculoDto;
import com.farmaceutica.distribucion.dto.VehiculoDto; // <-- Corregido (usa el DTO que creaste)

import java.util.List;

public interface ServiceActualizarOrdenDistribucion {

    /**
     * Consulta las órdenes de distribución pendientes.
     * @param estado El estado (ej. "Pendiente").
     * @return Lista de DTOs de las órdenes.
     */
    List<OrdenDistribucionDto> consultarOrdenesDistribucion(String estado);

    /**
     * Consulta los detalles (lotes/productos) de una orden específica.
     * @param idOrdenDist El ID de la orden.
     * @return Lista de DTOs de los detalles.
     */
    List<DetalleOrdenDistribucionDto> consultarDetallesDeOrden(Integer idOrdenDist);

    /**
     * Consulta los vehículos disponibles.
     * @return Lista de DTOs de vehículos.
     */
    List<VehiculoDto> consultarVehiculosDisponibles(); // <-- Corregido

    /**
     * Registra un nuevo viaje (Seguimiento) y sus detalles (Transporte).
     * Este método CREA un SeguimientoVehiculo.
     * El TRIGGER 'fn_logistica_inicio_viaje' pondrá el vehículo 'En Ruta'.
     *
     * @param dto DTO con los datos del viaje (vehículo, orden, lotes a transportar).
     * @return El DTO del seguimiento creado.
     */
    SeguimientoVehiculoDto registrarVehiculoAOrden(SeguimientoCreateDto dto);
}