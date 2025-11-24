// Ubicación: com/farmaceutica/almacenamiento/service/ServiceActualizarInventario.java

package com.farmaceutica.almacenamiento.service;

import com.farmaceutica.almacenamiento.dto.AjusteInventarioDto;
import com.farmaceutica.almacenamiento.dto.IncidenciaLoteDto; // <-- AÑADIR IMPORT
import com.farmaceutica.almacenamiento.dto.InventarioDto;
import com.farmaceutica.almacenamiento.dto.LoteProductoDto;
import com.farmaceutica.almacenamiento.dto.MovimientoInventarioDto; // <-- AÑADIR IMPORT

import java.util.List;

public interface ServiceActualizarInventario {

    // ... (Métodos que ya tenías: actualizarInventario, consultarInventario, etc.) ...
    void actualizarInventario(AjusteInventarioDto dto);
    List<InventarioDto> consultarInventario();
    InventarioDto consultarDetalleInventario(Integer idInventario);
    LoteProductoDto consultarDetalleLote(Integer idLote);

    // --- AÑADIR ESTOS DOS MÉTODOS ---

    /**
     * Consulta el historial de movimientos (Kardex) para un item de inventario.
     * @param idInventario El ID del inventario (Lote + Almacén).
     * @return Lista de movimientos.
     */
    List<MovimientoInventarioDto> consultarMovimientosInventario(Integer idInventario);

    /**
     * Consulta todas las incidencias reportadas para un lote específico.
     * @param idLote El ID del lote.
     * @return Lista de incidencias.
     */
    List<IncidenciaLoteDto> consultarIncidenciasPorLote(Integer idLote);
}