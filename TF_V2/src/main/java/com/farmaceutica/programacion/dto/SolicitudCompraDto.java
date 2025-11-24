package com.farmaceutica.programacion.dto;

import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.farmaceutica.programacion.model.SolicitudCompra}
 */
@Value
public class SolicitudCompraDto implements Serializable {
    Integer id;
    LocalDate fechaSolicitud;
    Integer idRequerimientoId;
    @Size(max = 50)
    String estado;
}