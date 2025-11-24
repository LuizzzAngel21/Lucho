package com.farmaceutica.distribucion.dto;

import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.farmaceutica.distribucion.model.OrdenDistribucion}
 */
@Value
public class OrdenDistribucionDto implements Serializable {
    Integer id;
    LocalDate fechaDistribucion;
    Integer idRequerimiento;
    @Size(max = 50)
    String estado;
    @Size(max = 20)
    String prioridad;
}