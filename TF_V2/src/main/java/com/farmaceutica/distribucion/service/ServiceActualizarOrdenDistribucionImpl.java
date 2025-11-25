package com.farmaceutica.distribucion.service;

import com.farmaceutica.almacenamiento.repository.LoteProductoRepository;
import com.farmaceutica.distribucion.dto.DetalleOrdenDistribucionDto;
import com.farmaceutica.distribucion.dto.OrdenDistribucionDto;
import com.farmaceutica.distribucion.dto.SeguimientoCreateDto;
import com.farmaceutica.distribucion.dto.SeguimientoVehiculoDto;
import com.farmaceutica.distribucion.dto.VehiculoDto;
import com.farmaceutica.distribucion.mapper.DetalleOrdenDistribucionMapper;
import com.farmaceutica.distribucion.mapper.OrdenDistribucionMapper;
import com.farmaceutica.distribucion.mapper.SeguimientoVehiculoMapper;
import com.farmaceutica.distribucion.mapper.VehiculoMapper;
import com.farmaceutica.distribucion.model.DetalleTransporte;
import com.farmaceutica.distribucion.model.SeguimientoVehiculo;
import com.farmaceutica.distribucion.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceActualizarOrdenDistribucionImpl implements ServiceActualizarOrdenDistribucion {

    // Repositorios
    private final OrdenDistribucionRepository ordenDistribucionRepository;
    private final DetalleOrdenDistribucionRepository detalleOrdenDistribucionRepository;
    private final VehiculoRepository vehiculoRepository;
    private final SeguimientoVehiculoRepository seguimientoVehiculoRepository;
    private final DetalleTransporteRepository detalleTransporteRepository;
    private final LoteProductoRepository loteProductoRepository;

    // Mappers
    private final OrdenDistribucionMapper ordenDistribucionMapper;
    private final DetalleOrdenDistribucionMapper detalleOrdenDistribucionMapper;
    private final VehiculoMapper vehiculoMapper;
    private final SeguimientoVehiculoMapper seguimientoVehiculoMapper;

    @Override
    @Transactional(readOnly = true)
    public List<OrdenDistribucionDto> consultarOrdenesDistribucion(String estado) {
        return ordenDistribucionMapper.toDto(ordenDistribucionRepository.findByEstado(estado));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetalleOrdenDistribucionDto> consultarDetallesDeOrden(Integer idOrdenDist) {
        return detalleOrdenDistribucionMapper.toDto(
                detalleOrdenDistribucionRepository.findByIdOrdenDist_Id(idOrdenDist));
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehiculoDto> consultarVehiculosDisponibles() {
        return vehiculoMapper.toDto(
                vehiculoRepository.findByEstado("Disponible"));
    }

    @Override
    public SeguimientoVehiculoDto registrarVehiculoAOrden(SeguimientoCreateDto dto) {
        SeguimientoVehiculo seguimiento = new SeguimientoVehiculo();
        seguimiento.setIdVehiculo(vehiculoRepository.findById(dto.idVehiculo())
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado")));
        seguimiento.setIdOrdenDist(ordenDistribucionRepository.findById(dto.idOrdenDist())
                .orElseThrow(() -> new EntityNotFoundException("Orden de Distribución no encontrada")));

        seguimiento.setEstadoActual("En Ruta");
        seguimiento.setUbicacionActual(dto.ubicacionActual());
        seguimiento.setProximoDestino(dto.proximoDestino());
        seguimiento.setEstimadoLlegada(dto.estimadoLlegada());
        seguimiento.setIdUsuarioActualizacion(dto.idUsuarioActualizacion());

        SeguimientoVehiculo seguimientoGuardado = seguimientoVehiculoRepository.save(seguimiento);

        List<DetalleTransporte> detalles = dto.detallesTransporte().stream().map(detalleDto -> {
            DetalleTransporte dt = new DetalleTransporte();
            dt.setIdSeguimiento(seguimientoGuardado);
            dt.setIdDetalleDistribucion(detalleOrdenDistribucionRepository.findById(detalleDto.idDetalleDistribucion())
                    .orElseThrow(() -> new EntityNotFoundException("Detalle de Distribución no encontrado")));
            dt.setIdLote(loteProductoRepository.findById(detalleDto.idLote())
                    .orElseThrow(() -> new EntityNotFoundException("Lote no encontrado")));
            dt.setCantidadTransportada(detalleDto.cantidadTransportada());
            dt.setCondicionesVerificadas(false);
            return dt;
        }).collect(Collectors.toList());

        detalleTransporteRepository.saveAll(detalles);

        return seguimientoVehiculoMapper.toDto(seguimientoGuardado);
    }

    @Override
    public void cancelarOrden(Integer idOrden) {
        var orden = ordenDistribucionRepository.findById(idOrden)
                .orElseThrow(() -> new EntityNotFoundException("Orden de Distribución no encontrada"));
        orden.setEstado("CANCELADA");
        ordenDistribucionRepository.save(orden);
    }

    @Override
    public void confirmarEntrega(Integer idOrden) {
        var orden = ordenDistribucionRepository.findById(idOrden)
                .orElseThrow(() -> new EntityNotFoundException("Orden de Distribución no encontrada"));
        orden.setEstado("ENTREGADA");
        ordenDistribucionRepository.save(orden);
    }
}