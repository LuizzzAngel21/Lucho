// Ubicación: com/farmaceutica/almacenamiento/mapper/LoteProductoMapper.java

package com.farmaceutica.almacenamiento.mapper;

import com.farmaceutica.almacenamiento.dto.InventarioDto;
import com.farmaceutica.almacenamiento.dto.LoteProductoDto;
import com.farmaceutica.almacenamiento.model.LoteProducto;
import org.mapstruct.*;
import java.util.List; // <-- Importar lista

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface LoteProductoMapper {

    // --- CORREGIDO: Ignorar el DTO anidado ---
    @Mapping(target = "idProducto", ignore = true)
    LoteProducto toEntity(LoteProductoDto loteProductoDto);

    LoteProductoDto toDto(LoteProducto loteProducto);

    // --- CORREGIDO: Ignorar el DTO anidado ---
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idProducto", ignore = true)
    LoteProducto partialUpdate(LoteProductoDto loteProductoDto, @MappingTarget LoteProducto loteProducto);

    // --- AÑADIR: Método de lista ---
    List<LoteProductoDto> toDto(List<LoteProducto> lotes);

    LoteProducto toEntity(InventarioDto.LoteResumenDto loteResumenDto);

    InventarioDto.LoteResumenDto toDto1(LoteProducto loteProducto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    LoteProducto partialUpdate(InventarioDto.LoteResumenDto loteResumenDto, @MappingTarget LoteProducto loteProducto);
}