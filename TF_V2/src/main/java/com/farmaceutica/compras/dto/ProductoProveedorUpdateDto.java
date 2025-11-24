// Ubicación: com/farmaceutica/compras/dto/ProductoProveedorUpdateDto.java

package com.farmaceutica.compras.dto;

import java.math.BigDecimal;

public record ProductoProveedorUpdateDto(
        Integer idProductoProveedor, // El ID de la tabla producto_proveedor
        BigDecimal nuevoPrecio
) {}