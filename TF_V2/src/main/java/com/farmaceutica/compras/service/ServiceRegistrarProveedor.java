// Ubicación: com/farmaceutica/compras/service/ServiceRegistrarProveedor.java

package com.farmaceutica.compras.service;

import com.farmaceutica.compras.dto.ProveedorCreateDto;
import com.farmaceutica.compras.dto.ProveedorDto;
import com.farmaceutica.compras.dto.ProveedorUpdateDto;

import java.util.List;

public interface ServiceRegistrarProveedor {

    /**
     * Lista todos los proveedores.
     */
    List<ProveedorDto> listarTodos();

    /**
     * Busca un proveedor por su ID.
     */
    ProveedorDto consultarPorId(Integer id);

    /**
     * Busca un proveedor por su RUC.
     */
    ProveedorDto consultarPorRuc(String ruc);

    /**
     * Registra un nuevo proveedor.
     * Valida que el RUC no esté duplicado.
     * @param dto DTO con los datos de creación.
     * @return DTO del proveedor creado.
     */
    ProveedorDto registrarProveedor(ProveedorCreateDto dto);

    /**
     * Actualiza un proveedor existente.
     * @param id ID del proveedor a actualizar.
     * @param dto DTO con los datos a modificar.
     * @return DTO del proveedor actualizado.
     */
    ProveedorDto actualizarProveedor(Integer id, ProveedorUpdateDto dto);
}