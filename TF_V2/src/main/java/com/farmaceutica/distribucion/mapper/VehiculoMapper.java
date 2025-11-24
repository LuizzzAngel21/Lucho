// Ubicación: com/farmaceutica/distribucion/mapper/VehiculoMapper.java

package com.farmaceutica.distribucion.mapper;

import com.farmaceutica.distribucion.dto.VehiculoDto;
import com.farmaceutica.distribucion.model.Vehiculo;
import org.mapstruct.*;
import java.util.List; // <-- Importa la lista

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface VehiculoMapper {

    // Métodos generados por JPA Buddy (son correctos)
    Vehiculo toEntity(VehiculoDto vehiculoDto);
    VehiculoDto toDto(Vehiculo vehiculo);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Vehiculo partialUpdate(VehiculoDto vehiculoDto, @MappingTarget Vehiculo vehiculo);

    // --- AÑADE ESTE MÉTODO DE LISTA ---
    List<VehiculoDto> toDto(List<Vehiculo> vehiculos);
}