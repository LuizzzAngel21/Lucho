import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SolicitudCompra } from '../../models/solicitudCompra.model';


@Component({
  selector: 'app-solicitudes-compra-table',
  standalone: false,
  templateUrl: './solicitudes-compra-table.component.html',
  styleUrl: './solicitudes-compra-table.component.css',
})
export class SolicitudesCompraTableComponent {
  @Input() solicitudes: SolicitudCompra[] | null = null;
  @Output() cotizar = new EventEmitter<SolicitudCompra>();

  displayedColumns: string[] = [
    'idSolicitud', 
    'area', 
    'solicitante', 
    'fechaCreacion', 
    'estado',
    'motivo', 
    'accion'
  ];

  onCotizar(solicitud: SolicitudCompra): void {
    this.cotizar.emit(solicitud);
  }

  
}
