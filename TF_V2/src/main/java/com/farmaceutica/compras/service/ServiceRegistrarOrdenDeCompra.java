package com.farmaceutica.compras.service;

import com.farmaceutica.compras.dto.*;
import com.farmaceutica.programacion.dto.DetalleSolicitudCompraDto;
import com.farmaceutica.programacion.dto.SolicitudCompraDto;

import java.util.List;

public interface ServiceRegistrarOrdenDeCompra {

    // --- Flujo de Solicitud (Lectura) ---
    List<SolicitudCompraDto> consultarSolicitudesPendientes(String estado);

    List<DetalleSolicitudCompraDto> consultarDetalleSolicitud(Integer idSolicitud);

    // --- Flujo de Cotización (ProductoProveedor) ---
    List<ProductoProveedorDto> consultarCotizacionesDeProducto(Integer idProducto);

    ProductoProveedorDto registrarCotizacion(ProductoProveedorCreateDto dto);

    ProductoProveedorDto actualizarCotizacion(ProductoProveedorUpdateDto dto);

    // --- Flujo de Orden de Compra (El principal) ---
    /**
     * Registra una nueva Orden de Compra formal.
     * 
     * @param dto DTO con los datos de la OC y sus detalles.
     * @return El ID de la OrdenCompra creada.
     */
    Integer registrarOrdenDeCompra(OrdenCompraCreateDto dto);

    /**
     * Lista las órdenes de compra por estado.
     * 
     * @param estado Estado de la orden (ej. "PENDIENTE", "GENERADA").
     * @return Lista de órdenes.
     */
    List<OrdenCompraDto> listarOrdenesPorEstado(String estado);
}