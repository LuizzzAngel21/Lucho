// Ubicación: com/farmaceutica/distribucion/dto/IncidenciaTransporteCreateDto.java

package com.farmaceutica.distribucion.dto;

public record IncidenciaTransporteCreateDto(
        Integer idVehiculo,
        Integer idOrdenDist,
        Integer idDetalleDist, // Opcional, si el problema es con un lote
        String tipoIncidencia, // Ej: "Accidente", "Tráfico"
        String descripcion,
        String impacto, // Ej: "Moderado", "Alto"
        Integer idUsuarioReporta
) {}