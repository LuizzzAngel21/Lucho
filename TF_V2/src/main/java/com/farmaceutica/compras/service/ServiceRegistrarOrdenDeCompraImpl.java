
package com.farmaceutica.compras.service;

import com.farmaceutica.compras.dto.*;
import com.farmaceutica.compras.mapper.ProductoProveedorMapper;
import com.farmaceutica.compras.model.DetalleOrdenCompra;
import com.farmaceutica.compras.model.OrdenCompra;
import com.farmaceutica.compras.model.ProductoProveedor;
import com.farmaceutica.compras.repository.*;
import com.farmaceutica.programacion.dto.DetalleSolicitudCompraDto;
import com.farmaceutica.programacion.dto.SolicitudCompraDto;
import com.farmaceutica.programacion.mapper.DetalleSolicitudCompraMapper;
import com.farmaceutica.programacion.mapper.SolicitudCompraMapper;
import com.farmaceutica.programacion.model.SolicitudCompra;
import com.farmaceutica.programacion.repository.DetalleSolicitudCompraRepository;
import com.farmaceutica.programacion.repository.SolicitudCompraRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceRegistrarOrdenDeCompraImpl implements ServiceRegistrarOrdenDeCompra {

    private final OrdenCompraRepository ordenCompraRepository;
    private final DetalleOrdenCompraRepository detalleOrdenCompraRepository;
    private final ProductoProveedorRepository productoProveedorRepository;
    private final ProductoRepository productoRepository;
    private final ProveedorRepository proveedorRepository;
    private final ProductoProveedorMapper productoProveedorMapper;

    // Repos de Programación (para consultar)
    private final SolicitudCompraRepository solicitudCompraRepository;
    private final DetalleSolicitudCompraRepository detalleSolicitudCompraRepository;
    private final SolicitudCompraMapper solicitudCompraMapper;
    private final DetalleSolicitudCompraMapper detalleSolicitudCompraMapper;


    // --- Flujo de Solicitud ---
    @Override
    @Transactional(readOnly = true)
    public List<SolicitudCompraDto> consultarSolicitudesPendientes(String estado) {
        return solicitudCompraMapper.toDto(solicitudCompraRepository.findByEstado(estado));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetalleSolicitudCompraDto> consultarDetalleSolicitud(Integer idSolicitud) {
        return detalleSolicitudCompraMapper.toDto(detalleSolicitudCompraRepository.findByIdSolicitud_Id(idSolicitud));
    }

    // --- Flujo de Cotización (ProductoProveedor) ---
    @Override
    @Transactional(readOnly = true)
    public List<ProductoProveedorDto> consultarCotizacionesDeProducto(Integer idProducto) {
        // Usa el método que definimos en el repositorio
        return productoProveedorMapper.toDto(
                productoProveedorRepository.findByIdProducto_Id(idProducto)
        );
    }


    @Override
    public ProductoProveedorDto registrarCotizacion(ProductoProveedorCreateDto dto) {

        // --- ¡AQUÍ SE USA! ---
        // 1. Validar si ya existe una cotización para este producto/proveedor
        productoProveedorRepository
                .findByIdProducto_IdAndIdProveedor_Id(dto.idProducto(), dto.idProveedor())
                .ifPresent(existente -> {
                    throw new IllegalArgumentException("Esta cotización (Producto-Proveedor) ya existe. ID: "
                            + existente.getId() + ". Use 'actualizar' en su lugar.");
                });

        // 2. Si no existe, crearla (Mapeo Manual)
        ProductoProveedor pp = new ProductoProveedor();
        pp.setIdProducto(productoRepository.findById(dto.idProducto()).orElseThrow());
        pp.setIdProveedor(proveedorRepository.findById(dto.idProveedor()).orElseThrow());
        pp.setPrecioReferencial(dto.precioReferencial());
        pp.setEstado(true);

        return productoProveedorMapper.toDto(productoProveedorRepository.save(pp));
    }

    @Override
    public ProductoProveedorDto actualizarCotizacion(ProductoProveedorUpdateDto dto) {
        ProductoProveedor pp = productoProveedorRepository.findById(dto.idProductoProveedor()).orElseThrow();
        pp.setPrecioReferencial(dto.nuevoPrecio());
        return productoProveedorMapper.toDto(productoProveedorRepository.save(pp));
    }

    // --- Flujo de Orden de Compra (El principal) ---
    @Override
    public Integer registrarOrdenDeCompra(OrdenCompraCreateDto dto) {
        // 1. Obtener y validar la Solicitud
        SolicitudCompra solicitud = solicitudCompraRepository.findById(dto.idSolicitud())
                .orElseThrow(() -> new EntityNotFoundException("Solicitud de Compra no encontrada"));

        // 2. Mapeo MANUAL de Cabecera (DTO -> Entidad)
        OrdenCompra oc = new OrdenCompra();
        oc.setIdSolicitud(solicitud);
        oc.setIdProveedor(dto.idProveedor());
        oc.setNumeroOrden(dto.numeroOrden());
        oc.setFechaEntregaEstimada(dto.fechaEntregaEstimada());
        oc.setObservaciones(dto.observaciones());
        oc.setEstado("Pendiente"); // Estado inicial

        // ¡Importante! Subtotal, IGV y Total se calculan con el TRIGGER de BD.
        // No los seteamos aquí.

        OrdenCompra cabeceraGuardada = ordenCompraRepository.save(oc);

        // 3. Mapeo MANUAL de Detalles (DTO -> Entidad)
        List<DetalleOrdenCompra> detalles = dto.detalles().stream().map(detalleDto -> {
            DetalleOrdenCompra doc = new DetalleOrdenCompra();
            doc.setIdOrden(cabeceraGuardada);
            doc.setIdProducto(productoRepository.findById(detalleDto.idProducto()).orElseThrow());
            doc.setIdDetalleSolicitud(detalleDto.idDetalleSolicitud());
            doc.setCantidad(detalleDto.cantidad());
            doc.setPrecioUnitario(detalleDto.precioUnitario());
            doc.setEstado("Pendiente");

            // ¡Importante! El 'subtotal' del detalle también se calcula
            // con un campo GENERATED en tu BD. (Recuerda poner insertable=false
            // y updatable=false en ese campo en tu Entidad).

            return doc;
        }).collect(Collectors.toList());

        detalleOrdenCompraRepository.saveAll(detalles);

        // 4. Actualizar estado de la Solicitud
        solicitud.setEstado("En Proceso"); // O "Aprobada"
        solicitudCompraRepository.save(solicitud);

        return cabeceraGuardada.getId();
    }
}