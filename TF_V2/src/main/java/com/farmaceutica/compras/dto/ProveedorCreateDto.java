// Ubicación: com/farmaceutica/compras/dto/ProveedorCreateDto.java

package com.farmaceutica.compras.dto;

/**
 * DTO para registrar un nuevo Proveedor.
 */
public record ProveedorCreateDto(
        String nombreProveedor,
        String ruc,
        String direccion,
        String telefono,
        String correo
) {}