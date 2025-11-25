package com.farmaceutica.programacion.mapper;

import com.farmaceutica.compras.model.FormaFarmaceutica;
import com.farmaceutica.compras.model.Producto;
import com.farmaceutica.compras.model.TipoProducto;
import com.farmaceutica.programacion.dto.DetalleRequerimientoDto;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

@Component
public class ProductoMapperHelper {

    @Named("productoToProductoResumenDto")
    public DetalleRequerimientoDto.ProductoResumenDto productoToProductoResumenDto(Producto producto) {
        if (producto == null) return null;
        
        return new DetalleRequerimientoDto.ProductoResumenDto(
                producto.getId(),
                producto.getNombreProducto(),
                producto.getCodigoDigemid(),
                producto.getRegistroSanitario(),
                producto.getIdTipo() != null ? producto.getIdTipo().getNombreTipo() : null,
                producto.getIdForma() != null ? producto.getIdForma().getNombreForma() : null,
                producto.getCondicionesAlmacenamiento()
        );
    }
}
