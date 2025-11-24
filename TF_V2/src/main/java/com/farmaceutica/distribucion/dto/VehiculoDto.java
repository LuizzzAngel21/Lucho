package com.farmaceutica.distribucion.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.farmaceutica.distribucion.model.Vehiculo}
 */
@Value
public class VehiculoDto implements Serializable {
    Integer id;
    @NotNull
    @Size(max = 20)
    String placa;
    @Size(max = 100)
    String marca;
    @Size(max = 100)
    String modelo;
    @Size(max = 50)
    String tipoVehiculo;
    @Size(max = 20)
    String estado;
}