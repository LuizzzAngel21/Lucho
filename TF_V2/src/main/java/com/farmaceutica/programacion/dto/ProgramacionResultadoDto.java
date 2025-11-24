package com.farmaceutica.programacion.dto;

public record ProgramacionResultadoDto(
        String tipo,
        Integer idSolicitudCompra,
        Integer idOrdenDistribucion,
        String message
) {}
