import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OrdenReporte } from '../../models/incidenciasModels/ordenReporte.model';

@Component({
  selector: 'app-reporte-ordenes-table',
  standalone: false,
  templateUrl: './reporte-ordenes-table.component.html',
  styleUrl: './reporte-ordenes-table.component.css',
})
export class ReporteOrdenesTableComponent {
  @Input() ordenes: OrdenReporte[] | null = []; 

  displayedColumns: string[] = [
    'idOrden', 
    'idRequerimiento', 
    'nombreUsuario', 
    'area', 
    'fechaEntregaEstimada', 
    'totalLotes',
    'accionDetalle', 
    'accionIncidencia' 
  ];

  @Output() verDetalles = new EventEmitter<number>(); // ID de la Orden
  @Output() verIncidencias = new EventEmitter<number>(); // ID de la Orden

  onVerDetalles(idOrden: number): void {
    this.verDetalles.emit(idOrden);
  }
  
  onVerIncidencias(idOrden: number): void {
    this.verIncidencias.emit(idOrden);
  }
}
