import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { SeguimientoVehiculo } from '../../models/seguimientoVehiculo.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-monitoreo-vehiculos-table',
  standalone: false,
  templateUrl: './monitoreo-vehiculos-table.component.html',
  styleUrl: './monitoreo-vehiculos-table.component.css',
})
export class MonitoreoVehiculosTableComponent {
  @Input() seguimientos: SeguimientoVehiculo[] | null = []; 

  displayedColumns: string[] = [
    'idSeguimiento', 
    'idOrden', 
    'idVehiculo', 
    'estadoActual', 
    'ubicacionActual',
    'fechaHoraActualizacion', 
    'proximoDestino', 
    'estimadoLlegada',
    'verLotes', // Acción 1
    'infoVehiculo', // Acción 2
    'confirmarEntrega', //Acción 3
    'registrarIncidencia' //Acción 4
  ];

  @Output() verLotes = new EventEmitter<number>(); // idSeguimiento
  @Output() verInfoVehiculo = new EventEmitter<number>(); // idVehiculo
  @Output() confirmarEntrega = new EventEmitter<number>(); // idOrden 
  @Output() registrarIncidencia = new EventEmitter<SeguimientoVehiculo>(); // idIncidencia

  onVerLotes(idSeguimiento: number): void {
    this.verLotes.emit(idSeguimiento);
  }
  
  onVerInfoVehiculo(idVehiculo: number): void {
    this.verInfoVehiculo.emit(idVehiculo);
  }

  onConfirmarEntrega(idOrden: number): void {
    this.confirmarEntrega.emit(idOrden);
  }

  onRegistrarIncidencia(seguimiento: SeguimientoVehiculo): void {
    this.registrarIncidencia.emit(seguimiento);
  }
}
