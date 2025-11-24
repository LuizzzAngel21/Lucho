// Ubicación: com/farmaceutica/distribucion/service/ServiceGestionarIncidenciaVehiculoImpl.java

package com.farmaceutica.distribucion.service;

import com.farmaceutica.core.repository.UsuarioRepository;
import com.farmaceutica.distribucion.dto.IncidenciaTransporteCreateDto;
import com.farmaceutica.distribucion.dto.IncidenciaTransporteDto;
import com.farmaceutica.distribucion.mapper.IncidenciaTransporteMapper;
import com.farmaceutica.distribucion.model.IncidenciaTransporte;
import com.farmaceutica.distribucion.repository.DetalleOrdenDistribucionRepository;
import com.farmaceutica.distribucion.repository.IncidenciaTransporteRepository;
import com.farmaceutica.distribucion.repository.OrdenDistribucionRepository;
import com.farmaceutica.distribucion.repository.VehiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceGestionarIncidenciaVehiculoImpl implements ServiceGestionarIncidenciaVehiculo {

    // Repositorios
    private final IncidenciaTransporteRepository incidenciaTransporteRepository;
    private final VehiculoRepository vehiculoRepository;
    private final OrdenDistribucionRepository ordenDistribucionRepository;
    private final DetalleOrdenDistribucionRepository detalleOrdenDistribucionRepository;
    private final UsuarioRepository usuarioRepository;

    // Mappers
    private final IncidenciaTransporteMapper incidenciaTransporteMapper;

    @Override
    public IncidenciaTransporteDto registrarIncidencia(IncidenciaTransporteCreateDto dto) {

        // Mapeo MANUAL (DTO -> Entidad)
        IncidenciaTransporte incidencia = new IncidenciaTransporte();

        // "Resolver" los IDs
        incidencia.setIdVehiculo(vehiculoRepository.findById(dto.idVehiculo())
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado: " + dto.idVehiculo())));

        incidencia.setIdUsuarioReporta(usuarioRepository.findById(dto.idUsuarioReporta())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado: " + dto.idUsuarioReporta())));

        // IDs opcionales (pueden ser nulos si la incidencia es general)
        if (dto.idOrdenDist() != null) {
            incidencia.setIdOrdenDist(ordenDistribucionRepository.findById(dto.idOrdenDist()).orElse(null));
        }
        if (dto.idDetalleDist() != null) {
            incidencia.setIdDetalleDist(detalleOrdenDistribucionRepository.findById(dto.idDetalleDist()).orElse(null));
        }

        incidencia.setTipoIncidencia(dto.tipoIncidencia());
        incidencia.setDescripcion(dto.descripcion());
        incidencia.setImpacto(dto.impacto());
        incidencia.setEstado("Pendiente");
        incidencia.setFechaIncidencia(Instant.now());

        IncidenciaTransporte guardada = incidenciaTransporteRepository.save(incidencia);
        return incidenciaTransporteMapper.toDto(guardada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncidenciaTransporteDto> consultarIncidenciasPorVehiculo(Integer idVehiculo) {
        return incidenciaTransporteMapper.toDto(
                incidenciaTransporteRepository.findByIdVehiculo_Id(idVehiculo)
        );
    }
}