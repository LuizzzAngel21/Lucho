// Ubicación: com/farmaceutica/almacenamiento/dto/IncidenciaLoteCreateDto.java

package com.farmaceutica.almacenamiento.dto;


public record IncidenciaLoteCreateDto(
        Integer idLote, // El lote que tiene el problema
        Integer idOrdenCompra, // La OC asociada al problema
        String tipoIncidencia, // Ej: "Dañado", "Vencido"
        String descripcion,
        String nivelSeveridad, // Ej: "Alta", "Media"
        Integer idUsuarioRegistro
) {}