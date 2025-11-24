package com.farmaceutica.almacenamiento.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.farmaceutica.almacenamiento.model.Inventario}
 */
@Value
public class InventarioDto implements Serializable {
    Integer id;
    @NotNull
    InventarioDto.AlmacenResumenDto idAlmacen;
    @NotNull
    InventarioDto.LoteResumenDto idLote;
    @NotNull
    Integer stockActual;
    Integer stockMinimo;
    @Size(max = 100)
    String ubicacionEspecifica;

    /**
     * DTO for {@link com.farmaceutica.almacenamiento.model.Almacen}
     */
    @Value
    public static class AlmacenResumenDto implements Serializable {
        @NotNull
        @Size(max = 150)
        String nombreAlmacen;
    }

    /**
     * DTO for {@link com.farmaceutica.almacenamiento.model.LoteProducto}
     */
    @Value
    public static class LoteResumenDto implements Serializable {
        Integer id;
        @NotNull
        @Size(max = 50)
        String numeroLote;
        @NotNull
        LocalDate fechaVencimiento;
    }
}