// Ubicación: com/farmaceutica/compras/dto/DetalleOrdenCompraCreateDto.java

package com.farmaceutica.compras.dto;

import java.math.BigDecimal;

public record DetalleOrdenCompraCreateDto(
        Integer idDetalleSolicitud, // Para trazabilidad
        Integer idProducto,
        Integer cantidad, // Cantidad final aprobada
        BigDecimal precioUnitario // Precio final negociado
) {}