package com.farmaceutica.almacenamiento.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.farmaceutica.almacenamiento.model.MovimientoInventario}
 */
@Value
public class MovimientoInventarioDto implements Serializable {
    Integer id;
    @NotNull
    @Size(max = 20)
    String tipoMovimiento;
    @NotNull
    Integer cantidad;
    Instant fechaMovimiento;
    String idUsuarioRegistroNombreUsuario;
    @Size(max = 50)
    String tipoReferencia;
    String observacion;
}