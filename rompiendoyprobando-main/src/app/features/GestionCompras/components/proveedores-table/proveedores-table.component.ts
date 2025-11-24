import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Proveedor } from '../../models/ProveedorModels/proveedor.model';

@Component({
  selector: 'app-proveedores-table',
  standalone: false,
  templateUrl: './proveedores-table.component.html',
  styleUrl: './proveedores-table.component.css',
})
export class ProveedoresTableComponent {
  @Input() proveedores: Proveedor[] | null = []; 

  // Columnas a mostrar
  displayedColumns: string[] = [
    'id', 
    'nombreProveedor', 
    'ruc', 
    'telefono', 
    'correo', 
    'estado', 
    'modificar', 
    'eliminar'
  ];

  // Eventos de salida
  @Output() editar = new EventEmitter<Proveedor>(); 
  @Output() eliminar = new EventEmitter<Proveedor>(); 

  /**
   * Emite el proveedor a editar.
   */
  onEditar(proveedor: Proveedor): void {
    this.editar.emit(proveedor);
  }

  /**
   * Emite el proveedor a eliminar.
   */
  onEliminar(proveedor: Proveedor): void {
    this.eliminar.emit(proveedor);
  }

}
