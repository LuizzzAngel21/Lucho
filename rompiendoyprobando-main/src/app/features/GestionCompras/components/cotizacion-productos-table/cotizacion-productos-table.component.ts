import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProductoCotizacion } from '../../models/productoCotizacion.model';

@Component({
  selector: 'app-cotizacion-productos-table',
  standalone: false,
  templateUrl: './cotizacion-productos-table.component.html',
  styleUrl: './cotizacion-productos-table.component.css',
})
export class CotizacionProductosTableComponent {
  @Input() productos: ProductoCotizacion[] | null = [];
  // El componente de página usará esto para abrir el overlay
  @Output() seleccionarProveedor = new EventEmitter<ProductoCotizacion>(); 
  // Evento que se emite cada vez que un campo editable cambia (para actualizar el subtotal)
  @Output() productoActualizado = new EventEmitter<ProductoCotizacion>();

  displayedColumns: string[] = [
    'idProducto', 
    'cantidadSolicitada', 
    'proveedor', 
    'precioReferencial', 
    'accion', 
    'subtotal'
  ];

  onPrecioChange(producto: ProductoCotizacion): void {
    const precio = producto.precioUnitarioReferencial || 0;
    
    // Recalcular el subtotal
    producto.subtotal = producto.cantidadSolicitada * precio;

    // Notificar al componente padre de la actualización
    this.productoActualizado.emit(producto);
  }

  onSeleccionarProveedor(producto: ProductoCotizacion): void {
    this.seleccionarProveedor.emit(producto);
  }
}
