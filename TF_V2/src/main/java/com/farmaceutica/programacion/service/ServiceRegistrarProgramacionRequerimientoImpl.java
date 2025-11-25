package com.farmaceutica.programacion.service;

import com.farmaceutica.almacenamiento.dto.InventarioStockDto;
import com.farmaceutica.almacenamiento.mapper.InventarioMapper;
import com.farmaceutica.almacenamiento.model.Inventario;
import com.farmaceutica.almacenamiento.repository.InventarioRepository;
import com.farmaceutica.programacion.dto.DetalleRequerimientoDto;
import com.farmaceutica.programacion.dto.RequerimientoResumenDto;
import com.farmaceutica.programacion.mapper.DetalleRequerimientoMapper;
import com.farmaceutica.programacion.mapper.RequerimientoMapper;
import com.farmaceutica.programacion.model.DetalleRequerimiento;
import com.farmaceutica.programacion.model.Requerimiento;
import com.farmaceutica.programacion.repository.DetalleRequerimientoRepository;
import com.farmaceutica.programacion.repository.RequerimientoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor // Inyección de dependencias vía constructor (más limpio)
@Transactional(readOnly = true) // Transacciones de solo lectura por defecto
public class ServiceRegistrarProgramacionRequerimientoImpl implements ServiceRegistrarProgramacionRequerimiento {

    // Repositories
    private final RequerimientoRepository requerimientoRepository;
    private final DetalleRequerimientoRepository detalleRequerimientoRepository;
    private final InventarioRepository inventarioRepository;

    // Mappers
    private final RequerimientoMapper requerimientoMapper;
    private final DetalleRequerimientoMapper detalleRequerimientoMapper;
    private final InventarioMapper inventarioMapper;

    @Override
    public List<RequerimientoResumenDto> consultarRequerimientosPendientes() {
        List<Requerimiento> requerimientos = requerimientoRepository.findByEstado("Pendiente");
        // MapStruct se encarga de la conversión
        return requerimientoMapper.toRequerimientoResumenDto(requerimientos);
    }

    @Override
    public List<DetalleRequerimientoDto> consultarDetallesRequerimiento(Integer requerimientoId) {
        List<DetalleRequerimiento> detalles = detalleRequerimientoRepository.findByIdRequerimiento_Id(requerimientoId);
        return detalleRequerimientoMapper.toDetalleRequerimientoDto(detalles);
    }

    @Override
    public List<InventarioStockDto> consultarStockDeProducto(Integer productoId) {
        // Busca solo lotes con stock > 0
        List<Inventario> inventario = inventarioRepository
                .findByIdLote_IdProducto_IdAndStockActualGreaterThan(productoId, 0);
        return inventarioMapper.toInventarioStockDto(inventario);
    }

    @Override
    public List<RequerimientoResumenDto> consultarRequerimientosAtendidos() {
        List<Requerimiento> requerimientos = requerimientoRepository.findByEstado("Atendido");
        return requerimientoMapper.toRequerimientoResumenDto(requerimientos);
    }
}