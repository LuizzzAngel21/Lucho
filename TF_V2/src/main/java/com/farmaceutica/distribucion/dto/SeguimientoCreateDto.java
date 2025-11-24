// Ubicación: com/farmaceutica/distribucion/dto/SeguimientoCreateDto.java

package com.farmaceutica.distribucion.dto;

import java.time.Instant;
import java.util.List;

public record SeguimientoCreateDto(
        Integer idVehiculo,
        Integer idOrdenDist,
        String ubicacionActual, // Ej: "Almacén Central"
        String proximoDestino, // Ej: "Área de Pediatría"
        Instant estimadoLlegada,
        Integer idUsuarioActualizacion,
        // La lista de detalles que van en ESTE viaje
        List<DetalleTransporteCreateDto> detallesTransporte
) {}