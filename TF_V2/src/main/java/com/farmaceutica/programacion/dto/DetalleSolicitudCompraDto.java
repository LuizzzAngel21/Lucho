package com.farmaceutica.programacion.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.farmaceutica.programacion.model.DetalleSolicitudCompra}
 */
@Value
public class DetalleSolicitudCompraDto implements Serializable {
    Integer id;
    @NotNull
    DetalleSolicitudCompraDto.ProductoResumenDto idProducto;
    @NotNull
    Integer cantidadSolicitada;
    @NotNull
    DetalleSolicitudCompraDto.ProveedorResumenDto idProveedorSeleccionado;
    BigDecimal precioReferencial;
    @Size(max = 20)
    String estado;

    /**
     * DTO for {@link com.farmaceutica.compras.model.Producto}
     */
    @Value
    public static class ProductoResumenDto implements Serializable {
        Integer id;
        @NotNull
        @Size(max = 150)
        String nombreProducto;
    }

    /**
     * DTO for {@link com.farmaceutica.compras.model.Proveedor}
     */
    @Value
    public static class ProveedorResumenDto implements Serializable {
        Integer id;
        @NotNull
        @Size(max = 150)
        String nombreProveedor;
    }
}