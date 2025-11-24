// Ubicación: com/farmaceutica/compras/dto/ProveedorUpdateDto.java

package com.farmaceutica.compras.dto;

/**
 * DTO para actualizar un Proveedor existente.
 */
public record ProveedorUpdateDto(
        String nombreProveedor,
        String direccion,
        String telefono,
        String correo,
        Boolean estado // Para activar o desactivar
) {}