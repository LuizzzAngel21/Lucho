package com.farmaceutica.distribucion.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.farmaceutica.distribucion.model.SeguimientoVehiculo}
 */
@Value
public class SeguimientoVehiculoDto implements Serializable {
    Integer id;
    VehiculoResumenDto idVehiculo;
    Integer idOrdenDistId;
    @Size(max = 50)
    String estadoActual;
    @Size(max = 200)
    String ubicacionActual;
    Instant fechaHoraActualizacion;
    @Size(max = 200)
    String proximoDestino;

    /**
     * DTO for {@link com.farmaceutica.distribucion.model.Vehiculo}
     */
    @Value
    public static class VehiculoResumenDto implements Serializable {
        Integer id;
        @NotNull
        @Size(max = 20)
        String placa;
    }
}