// Ubicación: com/farmaceutica/compras/dto/OrdenCompraCreateDto.java

package com.farmaceutica.compras.dto;

import java.time.LocalDate;
import java.util.List;

public record OrdenCompraCreateDto(
        Integer idSolicitud, // La solicitud que se está aprobando
        Integer idProveedor, // El proveedor final
        String numeroOrden,
        LocalDate fechaEntregaEstimada,
        String observaciones,
        List<DetalleOrdenCompraCreateDto> detalles
) {}