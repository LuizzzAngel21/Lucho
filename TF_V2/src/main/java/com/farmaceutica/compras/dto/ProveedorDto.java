package com.farmaceutica.compras.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.farmaceutica.compras.model.Proveedor}
 */
@Value
public class ProveedorDto implements Serializable {
    Integer id;
    @NotNull
    @Size(max = 150)
    String nombreProveedor;
    @NotNull
    @Size(max = 20)
    String ruc;
    String direccion;
    @Size(max = 20)
    String telefono;
    @Size(max = 150)
    String correo;
    Boolean estado;
}