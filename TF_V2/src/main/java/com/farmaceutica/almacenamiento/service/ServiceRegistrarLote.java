// Ubicación: com/farmaceutica/almacenamiento/service/ServiceRegistrarLote.java

package com.farmaceutica.almacenamiento.service;

import com.farmaceutica.almacenamiento.dto.IncidenciaLoteCreateDto;
import com.farmaceutica.almacenamiento.dto.IncidenciaLoteDto;
import com.farmaceutica.almacenamiento.dto.LoteCreateDto;
import com.farmaceutica.almacenamiento.dto.LoteProductoDto;

public interface ServiceRegistrarLote {

    /**
     * Registra un nuevo lote en el sistema (Recepción de Mercadería).
     * <p>
     * Esta es la lógica de negocio clave:
     * 1. Crea la entidad LoteProducto.
     * 2. Crea la entidad Inventario (el stock) con stock=0.
     * 3. Crea el PRIMER MovimientoInventario de 'Entrada'.
     * <p>
     * Los Triggers de la BD se encargarán de actualizar el stock real.
     *
     * @param dto DTO con los datos del lote que llega.
     * @return DTO del lote creado.
     */
    LoteProductoDto registrarLote(LoteCreateDto dto);

    /**
     * Registra una incidencia encontrada durante la recepción del lote.
     *
     * @param dto DTO con los detalles de la incidencia.
     * @return DTO de la incidencia creada.
     */
    IncidenciaLoteDto registrarIncidencia(IncidenciaLoteCreateDto dto);

    /**
     * Actualiza el estado de la Orden de Compra asociada (ej. 'Recibida').
     *
     * @param idOrdenCompra ID de la orden a actualizar.
     * @param nuevoEstado   El nuevo estado (ej. "Recibida", "Parcial").
     */
    void actualizarEstadoOrdenCompra(Integer idOrdenCompra, String nuevoEstado);
}