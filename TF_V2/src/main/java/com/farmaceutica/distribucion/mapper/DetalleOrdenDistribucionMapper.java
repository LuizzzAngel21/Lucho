package com.farmaceutica.distribucion.mapper;

import com.farmaceutica.distribucion.dto.DetalleOrdenDistribucionDto;
import com.farmaceutica.distribucion.model.DetalleOrdenDistribucion;
import org.mapstruct.*;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface DetalleOrdenDistribucionMapper {

    // --- CORREGIDO: Ignorar los objetos anidados ---
    @Mapping(target = "idProducto", ignore = true)
    @Mapping(target = "idLote", ignore = true)
    DetalleOrdenDistribucion toEntity(DetalleOrdenDistribucionDto detalleOrdenDistribucionDto);

    DetalleOrdenDistribucionDto toDto(DetalleOrdenDistribucion detalleOrdenDistribucion);

    // --- CORREGIDO: Ignorar los objetos anidados ---
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idProducto", ignore = true)
    @Mapping(target = "idLote", ignore = true)
    DetalleOrdenDistribucion partialUpdate(DetalleOrdenDistribucionDto detalleOrdenDistribucionDto, @MappingTarget DetalleOrdenDistribucion detalleOrdenDistribucion);

    List<DetalleOrdenDistribucionDto> toDto(List<DetalleOrdenDistribucion> detalles);
}
