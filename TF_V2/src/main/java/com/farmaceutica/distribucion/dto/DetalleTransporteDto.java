package com.farmaceutica.distribucion.dto;

import com.farmaceutica.almacenamiento.dto.InventarioDto;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.farmaceutica.distribucion.model.DetalleTransporte}
 */
@Value
public class DetalleTransporteDto implements Serializable {
    Integer id;
    Integer idSeguimientoId;
    InventarioDto.LoteResumenDto idLote;
    @NotNull
    Integer cantidadTransportada;
    Boolean condicionesVerificadas;
    BigDecimal temperaturaRegistrada;
}