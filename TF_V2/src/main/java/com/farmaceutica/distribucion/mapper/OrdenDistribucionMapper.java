// Ubicación: com/farmaceutica/distribucion/mapper/OrdenDistribucionMapper.java

package com.farmaceutica.distribucion.mapper;

import com.farmaceutica.distribucion.dto.OrdenDistribucionDto;
import com.farmaceutica.distribucion.model.OrdenDistribucion;
import org.mapstruct.*;
import java.util.List; // <-- Importa la lista

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrdenDistribucionMapper {

    // (Tus métodos existentes: toEntity, toDto singular, partialUpdate)
    OrdenDistribucion toEntity(OrdenDistribucionDto ordenDistribucionDto);

    OrdenDistribucionDto toDto(OrdenDistribucion ordenDistribucion);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    OrdenDistribucion partialUpdate(OrdenDistribucionDto ordenDistribucionDto, @MappingTarget OrdenDistribucion ordenDistribucion);

    // --- AÑADE ESTE MÉTODO DE LISTA ---
    List<OrdenDistribucionDto> toDto(List<OrdenDistribucion> ordenes);
}