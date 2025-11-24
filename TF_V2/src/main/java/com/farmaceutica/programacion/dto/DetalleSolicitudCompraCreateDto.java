package com.farmaceutica.programacion.dto;

public record DetalleSolicitudCompraCreateDto(
        Integer idProducto,
        Integer idDetalleRequerimiento, // Trazabilidad
        Integer cantidadSolicitada
) {}