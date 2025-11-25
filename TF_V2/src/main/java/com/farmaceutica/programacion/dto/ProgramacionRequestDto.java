package com.farmaceutica.programacion.dto;

import com.farmaceutica.distribucion.dto.DetalleOrdenDistribucionCreateDto;
import com.farmaceutica.programacion.validation.ProgramacionRequestValido;
import com.farmaceutica.programacion.validation.TipoProgramacionValido;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@ProgramacionRequestValido
public record ProgramacionRequestDto(
        @NotNull Integer idRequerimiento,
        @TipoProgramacionValido String tipo,
        @Valid SolicitudCompraCreateDto solicitudCompra,
        @Valid List<DetalleOrdenDistribucionCreateDto> detallesDistribucion
) {}