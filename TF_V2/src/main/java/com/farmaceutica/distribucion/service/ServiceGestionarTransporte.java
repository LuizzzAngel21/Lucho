// Ubicación: com/farmaceutica/distribucion/service/ServiceGestionarTransporte.java

package com.farmaceutica.distribucion.service;

import com.farmaceutica.distribucion.dto.DetalleTransporteDto;
import com.farmaceutica.distribucion.dto.SeguimientoVehiculoDto;
import java.util.List;

public interface ServiceGestionarTransporte {

    /**
     * Consulta los vehículos que están activamente en ruta.
     * @return Lista de DTOs de los viajes activos.
     */
    List<SeguimientoVehiculoDto> consultarVehiculosEnCamino();

    /**
     * Consulta los lotes específicos que van en un viaje.
     * @param idSeguimiento El ID del viaje (Seguimiento).
     * @return Lista de DTOs de los lotes/detalles.
     */
    List<DetalleTransporteDto> consultarLotesDelVehiculo(Integer idSeguimiento);
}