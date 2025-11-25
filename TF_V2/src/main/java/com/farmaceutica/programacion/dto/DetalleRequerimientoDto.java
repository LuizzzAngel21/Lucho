package com.farmaceutica.programacion.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.farmaceutica.programacion.model.DetalleRequerimiento}
 */
@Value
public class DetalleRequerimientoDto implements Serializable {
    Integer id;
    @NotNull
    DetalleRequerimientoDto.ProductoResumenDto idProducto;
    @NotNull
    Integer cantidad;
    Integer cantidadAtendida;
    String observacion;

    /**
     * DTO for {@link com.farmaceutica.compras.model.Producto}
     */
    @Value
    public static class ProductoResumenDto implements Serializable {
        Integer id;
        @NotNull
        @Size(max = 150)
        String nombreProducto;
        @Size(max = 50)
        String codigoDigemid;
        @Size(max = 50)
        String registroSanitario;
        String idTipoNombreTipo;
        String idFormaNombreForma;
        @Size(max = 100)
        String condicionesAlmacenamiento;
    }
}