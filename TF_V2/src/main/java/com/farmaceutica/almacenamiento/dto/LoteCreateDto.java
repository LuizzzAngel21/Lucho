
package com.farmaceutica.almacenamiento.dto;

import java.time.LocalDate;

public record LoteCreateDto(
        Integer idProducto,
        Integer idOrdenCompra, // Para enlazarlo a la OC que lo trajo
        String numeroLote,
        LocalDate fechaFabricacion,
        LocalDate fechaVencimiento,
        Integer cantidadInicial, // La cantidad total que llegó en este lote
        Integer idAlmacen, // ¿En qué almacén se va a guardar?
        String ubicacionEspecifica // Ej: "Estante A-01"
) {}