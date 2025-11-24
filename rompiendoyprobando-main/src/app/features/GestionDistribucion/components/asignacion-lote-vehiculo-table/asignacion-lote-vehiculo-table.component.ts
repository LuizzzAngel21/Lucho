import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DetalleOrdenDistribucion } from '../../models/detalleOrdenDistribucion.model';
import { Vehiculo } from '../../models/vehiculo.model';


@Component({
  selector: 'app-asignacion-lote-vehiculo-table',
  standalone: false, 
  templateUrl: './asignacion-lote-vehiculo-table.component.html',
  styleUrl: './asignacion-lote-vehiculo-table.component.css',
})
export class AsignacionLoteVehiculoTableComponent {
  @Input() detalles: DetalleOrdenDistribucion[] | null = []; 

  displayedColumns: string[] = [
    'idLote', 
    'nombreProducto', 
    'cantidadProducto', 
    'condicionTransporte',
    'asignacionVehiculo' 
  ];

  // Evento que se emite cuando se cambia un vehículo asignado
  @Output() asignacionCambio = new EventEmitter<DetalleOrdenDistribucion>(); 

  /**
   * Se dispara cuando el usuario selecciona un vehículo del combobox.
   * Emite el detalle actualizado para que el padre guarde el cambio.
   */
  onVehiculoChange(detalle: DetalleOrdenDistribucion): void {
    this.asignacionCambio.emit(detalle);
  }

  /**
   * Formatea la opción del vehículo para mostrar la capacidad y el tipo.
   */
  getVehiculoLabel(vehiculo: Vehiculo): string {
    return `#${vehiculo.idVehiculo} | Cap: ${vehiculo.capacidad} | Tipo: ${vehiculo.tipoVehiculo}`;
  }

  
}
