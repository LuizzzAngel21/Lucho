import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleRequerimiento } from '../../models/detalle_requerimiento';

@Component({
  selector: 'app-popup-detalle-de-requerimiento',
  templateUrl: './popup-detalle-de-requerimiento.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  styleUrls: ['./popup-detalle-de-requerimiento.component.css']
})
export class PopupDetalleDeRequerimientoComponent {
  @Input() data: DetalleRequerimiento[] = [];
  // Emite al padre para cerrar el popup
  @Output() close = new EventEmitter<void>();
  // (Opcional) evento para atender un item, si se requiere más adelante
  @Output() atender = new EventEmitter<DetalleRequerimiento>();
  
  displayedColumns: string[]=[
    'id_requerimiento',
    'id_producto',
    'cantidad',
    'observacion',
    'fecha_creacion',
    'fecha_actual'
  ];
}
