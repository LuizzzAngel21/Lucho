// Ubicación: com/farmaceutica/compras/mapper/ProductoProveedorMapper.java

package com.farmaceutica.compras.mapper;

import com.farmaceutica.compras.dto.ProductoProveedorDto;
import com.farmaceutica.compras.model.ProductoProveedor;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ProductoProveedorMapper {

    // --- CORREGIDO: Ignorar los objetos anidados ---
    @Mapping(target = "idProducto", ignore = true)
    @Mapping(target = "idProveedor", ignore = true)
    ProductoProveedor toEntity(ProductoProveedorDto productoProveedorDto);

    // Este está bien, ya que va de Entidad a DTO
    ProductoProveedorDto toDto(ProductoProveedor productoProveedor);

    // --- CORREGIDO: Ignorar también en la actualización ---
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idProducto", ignore = true)
    @Mapping(target = "idProveedor", ignore = true)
    ProductoProveedor partialUpdate(ProductoProveedorDto productoProveedorDto, @MappingTarget ProductoProveedor productoProveedor);

    List<ProductoProveedorDto> toDto(List<ProductoProveedor> byIdProductoId);
}