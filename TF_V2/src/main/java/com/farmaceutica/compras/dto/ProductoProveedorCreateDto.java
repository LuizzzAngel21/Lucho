// Ubicación: com/farmaceutica/compras/dto/ProductoProveedorCreateDto.java

package com.farmaceutica.compras.dto;

import java.math.BigDecimal;

public record ProductoProveedorCreateDto(
        Integer idProducto,
        Integer idProveedor,
        BigDecimal precioReferencial
) {}