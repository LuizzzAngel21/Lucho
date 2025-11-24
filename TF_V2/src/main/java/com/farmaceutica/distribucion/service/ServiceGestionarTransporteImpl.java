// Ubicación: com/farmaceutica/distribucion/service/ServiceGestionarTransporteImpl.java

package com.farmaceutica.distribucion.service;

import com.farmaceutica.distribucion.dto.DetalleTransporteDto;
import com.farmaceutica.distribucion.dto.SeguimientoVehiculoDto;
import com.farmaceutica.distribucion.mapper.DetalleTransporteMapper;
import com.farmaceutica.distribucion.mapper.SeguimientoVehiculoMapper;
import com.farmaceutica.distribucion.repository.DetalleTransporteRepository;
import com.farmaceutica.distribucion.repository.SeguimientoVehiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // Servicio de solo lectura
public class ServiceGestionarTransporteImpl implements ServiceGestionarTransporte {

    private final SeguimientoVehiculoRepository seguimientoVehiculoRepository;
    private final DetalleTransporteRepository detalleTransporteRepository;
    private final SeguimientoVehiculoMapper seguimientoVehiculoMapper;
    private final DetalleTransporteMapper detalleTransporteMapper;

    @Override
    public List<SeguimientoVehiculoDto> consultarVehiculosEnCamino() {
        // Busca viajes que estén "En Ruta" o "Retrasado", etc.
        List<String> estadosActivos = List.of("En Ruta", "En Entrega", "Retrasado");
        return seguimientoVehiculoMapper.toDto(
                seguimientoVehiculoRepository.findByEstadoActualIn(estadosActivos)
        );
    }

    @Override
    public List<DetalleTransporteDto> consultarLotesDelVehiculo(Integer idSeguimiento) {
        return detalleTransporteMapper.toDto(
                detalleTransporteRepository.findByIdSeguimiento_Id(idSeguimiento)
        );
    }
}