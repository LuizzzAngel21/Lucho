package com.farmaceutica.distribucion.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.farmaceutica.distribucion.model.IncidenciaTransporte}
 */
@Value
public class IncidenciaTransporteDto implements Serializable {
    Integer id;
    @NotNull
    SeguimientoVehiculoDto.VehiculoResumenDto idVehiculo;
    @NotNull
    @Size(max = 100)
    String tipoIncidencia;
    String descripcion;
    @Size(max = 20)
    String estado;
    Instant fechaIncidencia;
    String idUsuarioReportaNombreUsuario;
}