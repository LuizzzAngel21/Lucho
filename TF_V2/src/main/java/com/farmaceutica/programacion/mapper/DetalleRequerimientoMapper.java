package com.farmaceutica.programacion.mapper;

import com.farmaceutica.programacion.dto.DetalleRequerimientoDto;
import com.farmaceutica.programacion.model.DetalleRequerimiento;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {ProductoMapperHelper.class})
public interface DetalleRequerimientoMapper {

    // --- CORREGIDO: Ignorar el objeto Producto ---
    @Mapping(target = "idProducto", ignore = true)
    DetalleRequerimiento toEntity(DetalleRequerimientoDto detalleRequerimientoDto);

    @InheritInverseConfiguration(name = "toEntity")
    @Mapping(target = "idProducto", source = "idProducto", qualifiedByName = "productoToProductoResumenDto")
    DetalleRequerimientoDto toDto(DetalleRequerimiento detalleRequerimiento);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    DetalleRequerimiento partialUpdate(DetalleRequerimientoDto detalleRequerimientoDto, @MappingTarget DetalleRequerimiento detalleRequerimiento);

    // --- CORREGIDO: Aplicar la regla de 'toDto' a la lista ---
    @InheritInverseConfiguration(name = "toEntity")
    List<DetalleRequerimientoDto> toDetalleRequerimientoDto(List<DetalleRequerimiento> detalles);
}