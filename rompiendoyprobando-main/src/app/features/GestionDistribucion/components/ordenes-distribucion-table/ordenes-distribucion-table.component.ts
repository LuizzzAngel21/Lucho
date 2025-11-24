import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OrdenDistribucion } from '../../models/ordenDistribucion.model';

@Component({
  selector: 'app-ordenes-distribucion-table',
  standalone: false,
  templateUrl: './ordenes-distribucion-table.component.html',
  styleUrl: './ordenes-distribucion-table.component.css',
})
export class OrdenesDistribucionTableComponent {
  @Input() ordenes: OrdenDistribucion[] | null = []; 

  displayedColumns: string[] = [
    'idOrden', 
    'idRequerimiento', 
    'nombreUsuario', 
    'area', 
    'estado', 
    'prioridad', 
    'fechaEntregaEstimada', 
    'designarMovilidad',
    'cancelarOrden' 
  ];

  @Output() designarMovilidad = new EventEmitter<number>(); 
  @Output() cancelarOrden = new EventEmitter<number>();

  onDesignarMovilidad(idOrden: number): void {
    this.designarMovilidad.emit(idOrden);
  }

  onCancelarOrden(idOrden: number): void {
    this.cancelarOrden.emit(idOrden);
  }

}
