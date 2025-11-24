// Ubicación: com/farmaceutica/almacenamiento/mapper/IncidenciaLoteMapper.java

package com.farmaceutica.almacenamiento.mapper;

import com.farmaceutica.almacenamiento.dto.IncidenciaLoteDto;
import com.farmaceutica.almacenamiento.model.IncidenciaLote;
import org.mapstruct.*;
import java.util.List; // <-- Importar lista

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {LoteProductoMapper.class})
public interface IncidenciaLoteMapper {

    // --- CORREGIDO: Ignorar campos complejos ---
    @Mapping(target = "idLote", ignore = true)
    @Mapping(target = "idUsuarioRegistro", ignore = true)
    IncidenciaLote toEntity(IncidenciaLoteDto incidenciaLoteDto);

    // Mapeo correcto de Entidad a DTO
    @Mapping(source = "idUsuarioRegistro.nombreUsuario", target = "idUsuarioRegistroNombreUsuario")
    IncidenciaLoteDto toDto(IncidenciaLote incidenciaLote);

    // --- CORREGIDO: Ignorar campos complejos ---
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idLote", ignore = true)
    @Mapping(target = "idUsuarioRegistro", ignore = true)
    IncidenciaLote partialUpdate(IncidenciaLoteDto incidenciaLoteDto, @MappingTarget IncidenciaLote incidenciaLote);

    // --- AÑADIR: Método de lista (con la regla de mapeo) ---
    List<IncidenciaLoteDto> toDto(List<IncidenciaLote> incidencias);
}