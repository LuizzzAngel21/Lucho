// Ubicación: com/farmaceutica/almacenamiento/dto/AjusteInventarioDto.java

package com.farmaceutica.almacenamiento.dto;

public record AjusteInventarioDto(
        Integer idInventario, // El ID del inventario (Lote + Almacén) a ajustar
        Integer cantidad, // La cantidad a mover (positiva o negativa)
        String tipoMovimiento, // "Ajuste", "Salida por Merma", etc.
        String observacion,
        Integer idUsuarioRegistro
) {}