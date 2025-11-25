package com.farmaceutica.programacion.service;

import com.farmaceutica.almacenamiento.repository.InventarioRepository;
import com.farmaceutica.almacenamiento.repository.LoteProductoRepository;
import com.farmaceutica.compras.model.Producto;
import com.farmaceutica.compras.repository.ProductoRepository;
import com.farmaceutica.distribucion.dto.DetalleOrdenDistribucionCreateDto;
import com.farmaceutica.distribucion.model.DetalleOrdenDistribucion;
import com.farmaceutica.distribucion.model.OrdenDistribucion;
import com.farmaceutica.distribucion.repository.DetalleOrdenDistribucionRepository;
import com.farmaceutica.distribucion.repository.OrdenDistribucionRepository;
import com.farmaceutica.exception.BusinessException;
import com.farmaceutica.programacion.dto.ProgramacionRequestDto;
import com.farmaceutica.programacion.dto.ProgramacionResultadoDto;
import com.farmaceutica.programacion.dto.SolicitudCompraCreateDto;
import com.farmaceutica.programacion.model.DetalleSolicitudCompra;
import com.farmaceutica.programacion.model.Requerimiento;
import com.farmaceutica.programacion.model.SolicitudCompra;
import com.farmaceutica.programacion.repository.DetalleSolicitudCompraRepository;
import com.farmaceutica.programacion.repository.RequerimientoRepository;
import com.farmaceutica.programacion.repository.SolicitudCompraRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceRegistrarOrdenImpl implements ServiceRegistrarOrden {

    private final RequerimientoRepository requerimientoRepository;
    private final SolicitudCompraRepository solicitudCompraRepository;
    private final DetalleSolicitudCompraRepository detalleSolicitudCompraRepository;
    private final OrdenDistribucionRepository ordenDistribucionRepository;
    private final DetalleOrdenDistribucionRepository detalleOrdenDistribucionRepository;
    private final InventarioRepository inventarioRepository;
    private final ProductoRepository productoRepository;
    private final LoteProductoRepository loteProductoRepository;

    @Override
    public ProgramacionResultadoDto registrarOrdenEspecifica(ProgramacionRequestDto request) {

        if (request == null) {
            throw new BusinessException("La petición es nula.");
        }

        // Cargar requerimiento
        Requerimiento req = cargarYValidarRequerimientoPendiente(request.idRequerimiento());

        String tipo = request.tipo();
        Integer idSolicitud = null;
        Integer idOrden = null;

        // === COMPRA ===
        if ("COMPRA".equalsIgnoreCase(tipo)) {

            if (request.solicitudCompra() == null) {
                throw new BusinessException("Para COMPRA debe enviar 'solicitudCompra'.");
            }

            idSolicitud = procesarCompra(req, request.solicitudCompra());

            marcarRequerimientoAtendido(req);

            return new ProgramacionResultadoDto(
                    "COMPRA", idSolicitud, null, "Solicitud de compra creada con éxito.");
        }

        // === DISTRIBUCIÓN ===
        if ("DISTRIBUCION".equalsIgnoreCase(tipo)) {

            if (request.detallesDistribucion() == null || request.detallesDistribucion().isEmpty()) {
                throw new BusinessException("Para DISTRIBUCION debe enviar 'detallesDistribucion'.");
            }

            validarStockParaDistribucion(request.detallesDistribucion());

            idOrden = procesarDistribucion(req, request.detallesDistribucion());

            // 👇 Ahora SÍ se marca En Proceso
            marcarRequerimientoAtendido(req);

            return new ProgramacionResultadoDto(
                    "DISTRIBUCION", null, idOrden, "Orden de distribución creada con éxito.");
        }

        throw new BusinessException("Tipo no soportado: " + tipo);
    }

    // -------------------------------------------------------
    // PROCESAR COMPRA
    // -------------------------------------------------------
    private Integer procesarCompra(Requerimiento req, SolicitudCompraCreateDto dto) {

        if (dto.detalles() == null || dto.detalles().isEmpty())
            throw new BusinessException("La solicitud de compra debe incluir al menos un detalle.");

        dto.detalles().forEach(det -> {
            if (det.cantidadSolicitada() == null || det.cantidadSolicitada() <= 0)
                throw new BusinessException("Cantidad inválida para producto: " + det.idProducto());
        });

        SolicitudCompra sc = new SolicitudCompra();
        sc.setIdRequerimiento(req);
        sc.setIdUsuarioSolicitante(dto.idUsuarioSolicitante());
        sc.setMotivo(dto.motivo());
        sc.setEstado("PENDIENTE");

        SolicitudCompra cabecera = solicitudCompraRepository.save(sc);

        List<DetalleSolicitudCompra> detalles = dto.detalles().stream().map(detDto -> {

            DetalleSolicitudCompra d = new DetalleSolicitudCompra();
            d.setIdSolicitud(cabecera);
            d.setIdProducto(productoRepository.findById(detDto.idProducto())
                    .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado: " + detDto.idProducto())));
            d.setIdDetalleRequerimiento(detDto.idDetalleRequerimiento());
            d.setCantidadSolicitada(detDto.cantidadSolicitada());
            d.setCantidadAprobada(0);
            d.setEstado("PENDIENTE");
            return d;

        }).collect(Collectors.toList());

        detalleSolicitudCompraRepository.saveAll(detalles);

        return cabecera.getId();
    }

    // -------------------------------------------------------
    // PROCESAR DISTRIBUCIÓN
    // -------------------------------------------------------
    private Integer procesarDistribucion(Requerimiento req, List<DetalleOrdenDistribucionCreateDto> detallesDto) {

        OrdenDistribucion od = new OrdenDistribucion();
        od.setIdRequerimiento(req.getId());
        od.setIdUsuarioCreacion(req.getIdUsuarioSolicitante());
        od.setPrioridad(req.getPrioridad());
        od.setEstado("PENDIENTE");

        OrdenDistribucion cabecera = ordenDistribucionRepository.save(od);

        List<DetalleOrdenDistribucion> detalles = detallesDto.stream().map(dto -> {

            if (dto.cantidad() == null || dto.cantidad() <= 0)
                throw new BusinessException("Cantidad inválida para producto: " + dto.idProducto());

            DetalleOrdenDistribucion dod = new DetalleOrdenDistribucion();
            dod.setIdOrdenDist(cabecera);

            Producto producto = productoRepository.findById(dto.idProducto())
                    .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado: " + dto.idProducto()));
            dod.setIdProducto(producto);

            var lote = loteProductoRepository.findById(dto.idLote())
                    .orElseThrow(() -> new EntityNotFoundException("Lote no encontrado: " + dto.idLote()));

            if (!Objects.equals(lote.getIdProducto().getId(), dto.idProducto()))
                throw new BusinessException(
                        "El lote " + dto.idLote() + " no pertenece al producto " + dto.idProducto());

            dod.setIdLote(lote);
            dod.setCantidad(dto.cantidad());
            dod.setEstadoEntrega("PENDIENTE");
            dod.setCondicionesTransporte(producto.getCondicionesTransporte());

            return dod;

        }).collect(Collectors.toList());

        detalleOrdenDistribucionRepository.saveAll(detalles);

        return cabecera.getId();
    }

    // -------------------------------------------------------
    // VALIDACIONES
    // -------------------------------------------------------
    private Requerimiento cargarYValidarRequerimientoPendiente(Integer idRequerimiento) {

        if (idRequerimiento == null)
            throw new BusinessException("Debe enviar idRequerimiento.");

        Requerimiento req = requerimientoRepository.findById(idRequerimiento)
                .orElseThrow(() -> new EntityNotFoundException("Requerimiento no encontrado."));

        if (!"Pendiente".equalsIgnoreCase(req.getEstado()))
            throw new BusinessException("El requerimiento no está Pendiente.");

        return req;
    }

    private void marcarRequerimientoAtendido(Requerimiento req) {
        req.setEstado("Atendido");
        requerimientoRepository.save(req);
    }

    private void validarStockParaDistribucion(List<DetalleOrdenDistribucionCreateDto> detallesDto) {

        for (DetalleOrdenDistribucionCreateDto dto : detallesDto) {

            if (dto.cantidad() == null || dto.cantidad() <= 0)
                throw new BusinessException("Cantidad inválida para producto: " + dto.idProducto());

            Integer stockTotal = inventarioRepository.findStockTotalByIdProducto(dto.idProducto());

            if (stockTotal == null || stockTotal < dto.cantidad())
                throw new BusinessException("Stock insuficiente para producto: " + dto.idProducto());
        }
    }
}
