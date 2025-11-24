package com.farmaceutica.distribucion.mapper;

import com.farmaceutica.distribucion.dto.DetalleTransporteDto;
import com.farmaceutica.distribucion.model.DetalleTransporte;
import org.mapstruct.*;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface DetalleTransporteMapper {

    // --- CORREGIDO: Ignorar campos complejos ---
    @Mapping(target = "idLote", ignore = true)
    @Mapping(target = "idSeguimiento", ignore = true)
    DetalleTransporte toEntity(DetalleTransporteDto detalleTransporteDto);

    @Mapping(source = "idSeguimiento.id", target = "idSeguimientoId")
    DetalleTransporteDto toDto(DetalleTransporte detalleTransporte);

    // --- CORREGIDO: Ignorar campos complejos ---
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idLote", ignore = true)
    @Mapping(target = "idSeguimiento", ignore = true)
    DetalleTransporte partialUpdate(DetalleTransporteDto detalleTransporteDto, @MappingTarget DetalleTransporte detalleTransporte);

    List<DetalleTransporteDto> toDto(List<DetalleTransporte> detalles);
}