// Ubicación: com/farmaceutica/almacenamiento/mapper/InventarioMapper.java

package com.farmaceutica.almacenamiento.mapper;

import com.farmaceutica.almacenamiento.dto.InventarioDto;
import com.farmaceutica.almacenamiento.dto.InventarioStockDto;
import com.farmaceutica.almacenamiento.model.Inventario;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface InventarioMapper {

    // --- MÉTODOS PARA InventarioStockDto ---

    // CORREGIDO: Ignorar los objetos anidados
    @Mapping(target = "idAlmacen", ignore = true)
    @Mapping(target = "idLote", ignore = true)
    Inventario toEntity(InventarioStockDto inventarioStockDto);

    InventarioStockDto toDto(Inventario inventario);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idAlmacen", ignore = true)
    @Mapping(target = "idLote", ignore = true)
    Inventario partialUpdate(InventarioStockDto inventarioStockDto, @MappingTarget Inventario inventario);

    List<InventarioStockDto> toInventarioStockDto(List<Inventario> inventario);


    // --- MÉTODOS PARA InventarioDto ---

    // CORREGIDO: Ignorar los objetos anidados
    @Mapping(target = "idAlmacen", ignore = true)
    @Mapping(target = "idLote", ignore = true)
    Inventario toEntity(InventarioDto inventarioDto);

    InventarioDto toInventarioDto(Inventario inventario);

    List<InventarioDto> toInventarioDto(List<Inventario> inventarios);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idAlmacen", ignore = true)
    @Mapping(target = "idLote", ignore = true)
    Inventario partialUpdate(InventarioDto inventarioDto, @MappingTarget Inventario inventario);
}