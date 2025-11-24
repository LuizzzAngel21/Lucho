import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProveedorProductoCotizacion } from '../../models/proveedorProductoCotizacion.model';

@Component({
  selector: 'app-proveedores-productos-table',
  standalone: false,
  templateUrl: './proveedores-productos-table.component.html',
  styleUrl: './proveedores-productos-table.component.css',
})
export class ProveedoresProductosTableComponent {

  @Input() proveedores: ProveedorProductoCotizacion[] | null = [];
  displayedColumns: string[] = [
    'nombreProveedor', 
    'precioReferencial',  
    'accion' // Botón de acción 'Seleccionar'
  ];

  @Output() seleccionar = new EventEmitter<ProveedorProductoCotizacion>();

  /**
   * Emite el objeto ProveedorProductoCotizacion seleccionado.
   * @param proveedor El objeto completo del proveedor seleccionado.
   */
  onSeleccionar(proveedor: ProveedorProductoCotizacion): void {
    this.seleccionar.emit(proveedor);
  }
}
