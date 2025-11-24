package com.farmaceutica.programacion.service;

import com.farmaceutica.programacion.dto.ProgramacionRequestDto;
import com.farmaceutica.programacion.dto.ProgramacionResultadoDto;

public interface ServiceRegistrarOrden {

    /**
     * Procesa un requerimiento pendiente y crea una Solicitud de Compra (si tipo=COMPRA)
     * o una Orden de Distribución (si tipo=DISTRIBUCION).
     *
     * Devuelve un DTO con el resultado (id de la entidad creada y mensaje).
     */
    ProgramacionResultadoDto registrarOrdenEspecifica(ProgramacionRequestDto request);
}
