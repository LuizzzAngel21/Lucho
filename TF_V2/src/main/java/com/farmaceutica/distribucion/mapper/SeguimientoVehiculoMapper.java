package com.farmaceutica.distribucion.mapper;

import com.farmaceutica.distribucion.dto.SeguimientoVehiculoDto;
import com.farmaceutica.distribucion.model.SeguimientoVehiculo;
import org.mapstruct.*;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface SeguimientoVehiculoMapper {

    // --- CORREGIDO: Ignorar campos complejos ---
    @Mapping(target = "idVehiculo", ignore = true)
    @Mapping(target = "idOrdenDist", ignore = true)
    SeguimientoVehiculo toEntity(SeguimientoVehiculoDto seguimientoVehiculoDto);

    @Mapping(source = "idOrdenDist.id", target = "idOrdenDistId")
    SeguimientoVehiculoDto toDto(SeguimientoVehiculo seguimientoVehiculo);

    // --- CORREGIDO: Ignorar campos complejos ---
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idVehiculo", ignore = true)
    @Mapping(target = "idOrdenDist", ignore = true)
    SeguimientoVehiculo partialUpdate(SeguimientoVehiculoDto seguimientoVehiculoDto, @MappingTarget SeguimientoVehiculo seguimientoVehiculo);

    List<SeguimientoVehiculoDto> toDto(List<SeguimientoVehiculo> seguimientos);
}