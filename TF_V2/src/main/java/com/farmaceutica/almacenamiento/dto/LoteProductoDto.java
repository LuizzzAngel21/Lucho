package com.farmaceutica.almacenamiento.dto;

import com.farmaceutica.programacion.dto.DetalleRequerimientoDto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.farmaceutica.almacenamiento.model.LoteProducto}
 */
@Value
public class LoteProductoDto implements Serializable {
    Integer id;
    @NotNull
    DetalleRequerimientoDto.ProductoResumenDto idProducto;
    @NotNull
    @Size(max = 50)
    String numeroLote;
    @NotNull
    LocalDate fechaVencimiento;
    @NotNull
    Integer cantidadInicial;
    @NotNull
    Integer cantidadActual;
    @Size(max = 20)
    String estado;
}