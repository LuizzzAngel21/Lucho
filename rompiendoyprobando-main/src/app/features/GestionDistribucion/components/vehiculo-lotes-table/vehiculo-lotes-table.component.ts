import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DetalleTransporte } from '../../models/detalleTransporte.model';

@Component({
  selector: 'app-vehiculo-lotes-table',
  standalone: false,
  templateUrl: './vehiculo-lotes-table.component.html',
  styleUrl: './vehiculo-lotes-table.component.css',
})
export class VehiculoLotesTableComponent {
  @Input() detalles: DetalleTransporte[] | null = []; 

  displayedColumns: string[] = [
    'idLote', 
    'nombreProducto', 
    'cantidadTransportada', 
    'accion' 
  ];

  @Output() verInfoLote = new EventEmitter<number>(); // idLote

  onVerInfoLote(idLote: number): void {
    this.verInfoLote.emit(idLote);
  }

}
