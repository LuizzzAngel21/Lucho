package com.farmaceutica.compras.dto;

import lombok.Value;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for listing OrdenCompra
 */
@Value
public class OrdenCompraDto implements Serializable {
    Integer id;
    String numeroOrden;
    String nombreProveedor;
    String rucProveedor;
    LocalDate fechaEntregaEstimada;
    String estado;
    String observaciones;
    // Note: Total might be calculated or fetched from DB if needed
}
