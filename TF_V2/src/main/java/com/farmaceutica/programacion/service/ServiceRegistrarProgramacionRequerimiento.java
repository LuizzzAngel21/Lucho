package com.farmaceutica.programacion.service;

import com.farmaceutica.almacenamiento.dto.InventarioStockDto;
import com.farmaceutica.programacion.dto.DetalleRequerimientoDto;
import com.farmaceutica.programacion.dto.RequerimientoResumenDto;

import java.util.List;

public interface ServiceRegistrarProgramacionRequerimiento {

    /**
     * Consulta los requerimientos pendientes.
     * @return Lista de DTOs con el resumen de requerimientos.
     */
    List<RequerimientoResumenDto> consultarRequerimientosPendientes();

    /**
     * Consulta los detalles (productos) de un requerimiento específico.
     * @param requerimientoId El ID del requerimiento a detallar.
     * @return Lista de DTOs con los detalles de los productos.
     */
    List<DetalleRequerimientoDto> consultarDetallesRequerimiento(Integer requerimientoId);

    /**
     * Consulta el stock disponible (lotes y almacenes) para un producto específico.
     * @param productoId El ID del producto a consultar.
     * @return Lista de DTOs del inventario con stock positivo.
     */
    List<InventarioStockDto> consultarStockDeProducto(Integer productoId);
}