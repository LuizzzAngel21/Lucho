import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ResumenCompra } from '../../models/resumenCompra.model';

@Component({
  selector: 'app-resumen-compra-table',
  standalone: false,
  templateUrl: './resumen-compra-table.component.html',
  styleUrl: './resumen-compra-table.component.css',
})
export class ResumenCompraTableComponent {
  // La fuente de datos para el resumen de la compra
  @Input() resumen: ResumenCompra[] | null = []; 

  // Columnas a mostrar
  displayedColumns: string[] = [
    'idProducto', 
    'cantidadComprada', 
    'proveedor', 
    'precioUnitario', 
    'subtotal'
  ];

  // Columnas para el pie de tabla (footer), solo para el cálculo total
  footerColumns: string[] = ['totalLabel', 'totalValue'];

  /**
   * Calcula el total general de la compra.
   */
  getTotalCompra(): number {
    return this.resumen
      ? this.resumen.reduce((acc, item) => acc + (item.subtotal || 0), 0)
      : 0;
  }
}
