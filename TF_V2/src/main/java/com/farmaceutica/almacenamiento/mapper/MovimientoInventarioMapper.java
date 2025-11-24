// Ubicación: com/farmaceutica/almacenamiento/mapper/MovimientoInventarioMapper.java

package com.farmaceutica.almacenamiento.mapper;

import com.farmaceutica.almacenamiento.dto.MovimientoInventarioDto;
import com.farmaceutica.almacenamiento.model.MovimientoInventario;
import org.mapstruct.*;
import java.util.List; // <-- Importar lista

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface MovimientoInventarioMapper {

    // --- CORREGIDO: Ignorar el objeto anidado ---
    @Mapping(target = "idUsuarioRegistro", ignore = true)
    MovimientoInventario toEntity(MovimientoInventarioDto movimientoInventarioDto);

    // Mapeo correcto de Entidad a DTO
    @Mapping(source = "idUsuarioRegistro.nombreUsuario", target = "idUsuarioRegistroNombreUsuario")
    MovimientoInventarioDto toDto(MovimientoInventario movimientoInventario);

    // --- CORREGIDO: Ignorar el objeto anidado ---
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idUsuarioRegistro", ignore = true)
    MovimientoInventario partialUpdate(MovimientoInventarioDto movimientoInventarioDto, @MappingTarget MovimientoInventario movimientoInventario);

    // --- AÑADIR: Método de lista (con la regla de mapeo) ---
    List<MovimientoInventarioDto> toDto(List<MovimientoInventario> movimientos);
}