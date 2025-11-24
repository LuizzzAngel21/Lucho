package com.farmaceutica.programacion.dto;

import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.farmaceutica.programacion.model.Requerimiento}
 */
@Value
public class RequerimientoResumenDto implements Serializable {
    Integer id;
    LocalDate fechaSolicitud;
    String idDepartamentoNombreDepartamento;
    @Size(max = 20)
    String prioridad;
    @Size(max = 50)
    String estado;
}