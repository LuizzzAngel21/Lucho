package com.farmaceutica.almacenamiento.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.farmaceutica.almacenamiento.model.IncidenciaLote}
 */
@Value
public class IncidenciaLoteDto implements Serializable {
    Integer id;
    @NotNull
    LoteProductoDto idLote;
    @NotNull
    @Size(max = 100)
    String tipoIncidencia;
    String descripcion;
    @Size(max = 20)
    String estado;
    Instant fechaIncidencia;
    String idUsuarioRegistroNombreUsuario;
}