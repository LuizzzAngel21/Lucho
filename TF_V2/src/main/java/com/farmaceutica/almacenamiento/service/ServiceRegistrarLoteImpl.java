// Ubicación: com/farmaceutica/almacenamiento/service/ServiceRegistrarLoteImpl.java
// (VERSIÓN CORREGIDA)

package com.farmaceutica.almacenamiento.service;

import com.farmaceutica.almacenamiento.dto.IncidenciaLoteCreateDto;
import com.farmaceutica.almacenamiento.dto.IncidenciaLoteDto;
import com.farmaceutica.almacenamiento.dto.LoteCreateDto;
import com.farmaceutica.almacenamiento.dto.LoteProductoDto;
import com.farmaceutica.almacenamiento.mapper.IncidenciaLoteMapper;
import com.farmaceutica.almacenamiento.mapper.LoteProductoMapper;
import com.farmaceutica.almacenamiento.model.IncidenciaLote;
import com.farmaceutica.almacenamiento.model.Inventario;
import com.farmaceutica.almacenamiento.model.LoteProducto;
import com.farmaceutica.almacenamiento.model.MovimientoInventario;
import com.farmaceutica.almacenamiento.repository.AlmacenRepository;
import com.farmaceutica.almacenamiento.repository.IncidenciaLoteRepository;
import com.farmaceutica.almacenamiento.repository.InventarioRepository;
import com.farmaceutica.almacenamiento.repository.LoteProductoRepository;
import com.farmaceutica.almacenamiento.repository.MovimientoInventarioRepository;
import com.farmaceutica.compras.model.OrdenCompra;
import com.farmaceutica.compras.repository.OrdenCompraRepository;
import com.farmaceutica.compras.repository.ProductoRepository;
import com.farmaceutica.core.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceRegistrarLoteImpl implements ServiceRegistrarLote {

    // Repos de Almacenamiento
    private final LoteProductoRepository loteProductoRepository;
    private final InventarioRepository inventarioRepository;
    private final MovimientoInventarioRepository movimientoInventarioRepository;
    private final IncidenciaLoteRepository incidenciaLoteRepository;
    private final AlmacenRepository almacenRepository;

    // Repos de otros módulos
    private final ProductoRepository productoRepository;
    private final OrdenCompraRepository ordenCompraRepository;
    private final UsuarioRepository usuarioRepository;

    // Mappers
    private final LoteProductoMapper loteProductoMapper;
    private final IncidenciaLoteMapper incidenciaLoteMapper;

    @Override
    public LoteProductoDto registrarLote(LoteCreateDto dto) {

        loteProductoRepository.findByNumeroLote(dto.numeroLote()).ifPresent(l -> {
            throw new IllegalArgumentException("El número de lote " + dto.numeroLote() + " ya existe.");
        });

        // 2. Mapeo MANUAL (DTO -> Entidad LoteProducto) - CORREGIDO
        LoteProducto lote = new LoteProducto();
        lote.setIdProducto(productoRepository.findById(dto.idProducto()).orElseThrow()); // <--- CORREGIDO
        lote.setIdOrdenCompra(ordenCompraRepository.findById(dto.idOrdenCompra()).orElseThrow()); // <--- CORREGIDO
        lote.setNumeroLote(dto.numeroLote());
        lote.setFechaFabricacion(dto.fechaFabricacion());
        lote.setFechaVencimiento(dto.fechaVencimiento());
        lote.setCantidadInicial(dto.cantidadInicial());
        lote.setCantidadActual(0);
        lote.setEstado("Disponible");

        LoteProducto loteGuardado = loteProductoRepository.save(lote);

        // 3. Crear el INVENTARIO (el "dónde") - CORREGIDO
        Inventario inventario = new Inventario();
        inventario.setIdLote(loteGuardado); // <--- CORREGIDO
        inventario.setIdAlmacen(almacenRepository.findById(dto.idAlmacen()).orElseThrow()); // <--- CORREGIDO
        inventario.setStockActual(0);
        inventario.setUbicacionEspecifica(dto.ubicacionEspecifica());

        Inventario inventarioGuardado = inventarioRepository.save(inventario);

        // 4. Crear el MOVIMIENTO INICIAL (el "cómo") - CORREGIDO
        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setIdInventario(inventarioGuardado); // <--- CORREGIDO
        movimiento.setTipoMovimiento("Entrada");
        movimiento.setTipoReferencia("COMPRA");
        movimiento.setIdReferencia(dto.idOrdenCompra());
        movimiento.setCantidad(dto.cantidadInicial());

        movimientoInventarioRepository.save(movimiento);

        actualizarEstadoOrdenCompra(dto.idOrdenCompra(), "Parcial");

        return loteProductoMapper.toDto(loteGuardado);
    }

    @Override
    public IncidenciaLoteDto registrarIncidencia(IncidenciaLoteCreateDto dto) {
        IncidenciaLote incidencia = new IncidenciaLote();

        // Mapeo MANUAL (DTO -> Entidad) - CORREGIDO
        incidencia.setIdLote(loteProductoRepository.findById(dto.idLote()).orElseThrow()); // <--- CORREGIDO
        incidencia.setIdOrdenCompra(ordenCompraRepository.findById(dto.idOrdenCompra()).orElseThrow()); // <--- CORREGIDO
        incidencia.setIdUsuarioRegistro(usuarioRepository.findById(dto.idUsuarioRegistro()).orElseThrow()); // <--- CORREGIDO
        incidencia.setTipoIncidencia(dto.tipoIncidencia());
        incidencia.setDescripcion(dto.descripcion());
        incidencia.setNivelSeveridad(dto.nivelSeveridad());
        incidencia.setEstado("Pendiente");
        incidencia.setFechaIncidencia(Instant.now());

        IncidenciaLote guardada = incidenciaLoteRepository.save(incidencia);
        return incidenciaLoteMapper.toDto(guardada);
    }

    @Override
    public void actualizarEstadoOrdenCompra(Integer idOrdenCompra, String nuevoEstado) {
        OrdenCompra oc = ordenCompraRepository.findById(idOrdenCompra).orElseThrow();
        oc.setEstado(nuevoEstado);
        ordenCompraRepository.save(oc);
    }
}