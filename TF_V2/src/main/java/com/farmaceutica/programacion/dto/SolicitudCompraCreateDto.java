package com.farmaceutica.programacion.dto;

import java.util.List;

// Usar 'record' es moderno y perfecto para DTOs inmutables
public record SolicitudCompraCreateDto(
        Integer idRequerimiento,
        Integer idUsuarioSolicitante,
        String motivo,
        List<DetalleSolicitudCompraCreateDto> detalles
) {}