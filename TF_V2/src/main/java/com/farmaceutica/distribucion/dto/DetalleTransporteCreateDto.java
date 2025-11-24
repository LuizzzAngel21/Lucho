// Ubicación: com/farmaceutica/distribucion/dto/DetalleTransporteCreateDto.java

package com.farmaceutica.distribucion.dto;

public record DetalleTransporteCreateDto(
        Integer idDetalleDistribucion, // El ID de la línea de la orden original
        Integer idLote,
        Integer cantidadTransportada
) {}