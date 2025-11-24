// Ubicación: com/farmaceutica/distribucion/dto/DetalleOrdenDistribucionCreateDto.java

package com.farmaceutica.distribucion.dto;

/**
 * DTO para los detalles de la Orden de Distribución.
 .
 */
public record DetalleOrdenDistribucionCreateDto(
        Integer idProducto,
        Integer idLote, // ¡El campo clave! El supervisor elige qué lote usar
        Integer cantidad
) {}