package com.farmaceutica.distribucion.dto;

import com.farmaceutica.almacenamiento.dto.InventarioDto;
import com.farmaceutica.programacion.dto.DetalleRequerimientoDto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.farmaceutica.distribucion.model.DetalleOrdenDistribucion}
 */
@Value
public class DetalleOrdenDistribucionDto implements Serializable {
    Integer id;
    InventarioDto.LoteResumenDto idLote;
    DetalleRequerimientoDto.ProductoResumenDto idProducto;
    @NotNull
    Integer cantidad;
    @Size(max = 20)
    String estadoEntrega;
}