package com.farmaceutica.compras.mapper;

import com.farmaceutica.compras.dto.ProveedorDto;
import com.farmaceutica.compras.model.Proveedor;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ProveedorMapper {
    Proveedor toEntity(ProveedorDto proveedorDto);

    ProveedorDto toDto(Proveedor proveedor);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Proveedor partialUpdate(ProveedorDto proveedorDto, @MappingTarget Proveedor proveedor);
    List<ProveedorDto> toDto(List<Proveedor> proveedores);
}