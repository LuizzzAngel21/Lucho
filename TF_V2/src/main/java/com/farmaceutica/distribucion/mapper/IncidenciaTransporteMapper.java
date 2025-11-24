package com.farmaceutica.distribucion.mapper;

import com.farmaceutica.distribucion.dto.IncidenciaTransporteDto;
import com.farmaceutica.distribucion.model.IncidenciaTransporte;
import org.mapstruct.*;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface IncidenciaTransporteMapper {

    // --- CORREGIDO: Ignorar campos complejos ---
    @Mapping(target = "idVehiculo", ignore = true)
    @Mapping(target = "idUsuarioReporta", ignore = true)
    IncidenciaTransporte toEntity(IncidenciaTransporteDto incidenciaTransporteDto);

    // Mapeo correcto de Entidad a DTO
    @Mapping(source = "idUsuarioReporta.nombreUsuario", target = "idUsuarioReportaNombreUsuario")
    IncidenciaTransporteDto toDto(IncidenciaTransporte incidenciaTransporte);

    // --- CORREGIDO: Ignorar campos complejos ---
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idVehiculo", ignore = true)
    @Mapping(target = "idUsuarioReporta", ignore = true)
    IncidenciaTransporte partialUpdate(IncidenciaTransporteDto incidenciaTransporteDto, @MappingTarget IncidenciaTransporte incidenciaTransporte);

    // Método de lista
    List<IncidenciaTransporteDto> toDto(List<IncidenciaTransporte> incidencias);
}