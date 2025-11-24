package com.farmaceutica.compras.dto;

import com.farmaceutica.programacion.dto.DetalleSolicitudCompraDto;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.farmaceutica.compras.model.ProductoProveedor}
 */
@Value
public class ProductoProveedorDto implements Serializable {
    Integer id;
    DetalleSolicitudCompraDto.ProductoResumenDto idProducto;
    DetalleSolicitudCompraDto.ProveedorResumenDto idProveedor;
    @NotNull
    BigDecimal precioReferencial;
    Boolean estado;
}